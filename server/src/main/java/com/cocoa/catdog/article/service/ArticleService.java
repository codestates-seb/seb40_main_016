package com.cocoa.catdog.article.service;

import com.amazonaws.util.CollectionUtils;
import com.cocoa.catdog.article.Dto.ArticleImgDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImg;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.article.mapper.ArticleImgMapper;
import com.cocoa.catdog.article.repository.ArticleImgRepository;
import com.cocoa.catdog.article.repository.ArticleRepository;
import com.cocoa.catdog.article.repository.LikeRepository;
import com.cocoa.catdog.article.repository.ReportRepository;
import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.repository.CommentRepository;
import com.cocoa.catdog.config.aws.S3Uploader;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.message.SseEmitterService;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.repository.UserRepository;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleImgRepository articleImgRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikeRepository likeRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;
    private final S3Uploader s3Uploader;
    private final SseEmitterService sseEmitterService;
    private final ApplicationEventPublisher eventPublisher;
    private final ArticleImgMapper mapper;


    /*
    * 게시물 등록
    * */
    public Article saveArticle(Article article, Long userId, List<MultipartFile> files) {

        User findUser = userService.findUser(userId);

        Long articleId = article.getArticleId();
        if (!CollectionUtils.isNullOrEmpty(files)) {
            ArticleImgDto.Post articleImgDto;
            ArticleImg articleImg;
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();

                String imgUrl = s3Uploader.uploadFile("articleImages/", file);

                articleImgDto = ArticleImgDto.Post.builder()
                        .imgUrl(imgUrl)
                        .article(article)
                        .build();

                articleImg = new ArticleImg(
                        articleImgDto.getImgUrl()
                );
                articleImg.setArticle(article);

                article.getArticleImg().add(articleImg);
                articleImgRepository.save(articleImg);
            }
        }


        article.setUser(findUser);

        findUser.getArticles().add(article);
        return articleRepository.save(article);
    }

    //테스트
    public Article saveArticleTest (Article article, Long userId) {
        User findUser = userService.findUser(userId);
        article.addUser(findUser);

        eventPublisher.publishEvent(findUser);
        return  articleRepository.save(article);
    }

    /*
    * 게시물 조회
    * */
    @Transactional(readOnly = true)
    public Article findArticle(Long articleId){
        return findVerifiedArticle(articleId);
    }

    /*
    * 게시물 존재여부 검증
    * */
    @Transactional(readOnly = true)
    private Article findVerifiedArticle(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    /*
    * 게시물 작성자 일치 검증
    * */
    @Transactional(readOnly = true)
    private void verifiedUser (Article article, Long userId) {
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
    }

    /*
    * 게시물 수정
    * */
    public Article updateArticle(Article newArticle, Long userId) {
        Article article = findVerifiedArticle(newArticle.getArticleId());
        verifiedUser(newArticle, userId);
        Optional.ofNullable(newArticle.getArticleImg())
                .ifPresent(articleImg -> article.setArticleImg(articleImg));
        Optional.ofNullable(newArticle.getContent())
                .ifPresent(content -> article.setContent(content));

        return article;
    }

    /*
    * 게시물 목록 조회
    * */
    @Transactional(readOnly = true)
    public Page<Article> findArticles(int page, int size, String sort, String order, long userId) {
        //쿼리 정리
        sort = queryFilter(sort, "sort");
        order = queryFilter(order, "order");

        PageRequest pageRequest = PageRequest.of(page, size,
                Sort.by(order).descending().and(Sort.by("articleId").descending()));
        Page<Article> articlePage;

        //글목록을 쿼리별로 조회
        if(sort.equals("all")) {
            articlePage = articleRepository.findAll(pageRequest);
        } else if(sort.equals("followings")) {
            User user = userService.findUser(userId);
            articlePage = articleRepository.findByUser_UserIdIn(
                    user.getFollowingUsers().stream()
                            .map(followingUser -> followingUser.getFollowedUser().getUserId())
                            .collect(Collectors.toList()),
                    pageRequest);
        } else {
            articlePage = articleRepository.findByUser_UserType(User.UserType.valueOf(sort), pageRequest);
        }


        return articlePage;
    }

    /*
    * 마이페이지 게시물 조회
    * */
    @Transactional(readOnly = true)
    public Page<Article> findProfileArticles(int page, int size, String tab, Long userId) {
        tab = queryFilter(tab, "tab");

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("articleId").descending());
        Page<Article> articlePage;
        if(tab.equals("post")) {
            articlePage = articleRepository.findByUser_UserId(userId, pageRequest);
        } else if(tab.equals("give")) {
            List<Long> articleIdList = userService.findUser(userId).getWallet().getGives().stream()
                    .map(giveTake -> giveTake.getArticle().getArticleId())
                    .collect(Collectors.toList());
            articlePage = articleRepository.findByArticleIdIn(articleIdList, pageRequest);
        } else {
            User user = userService.findUser(userId);
            if(user.getUserType() == User.UserType.PERSON) {
                throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
            }
            //yummyCnt가 아닌 거래내역을 기준으로 했을시
//            List<Long> articleIdList = user.getWallet().getTakes().stream()
//                    .map(giveTake -> giveTake.getArticle().getArticleId())
//                    .collect(Collectors.toList());
//            articlePage = articleRepository.findByArticleIdIn(articleIdList,
//                    PageRequest.of(page, size, Sort.by("yummyCnt").descending()
//                            .and(Sort.by("articleId").descending())));
            articlePage = articleRepository.findAll(PageRequest.of(page, size, Sort.by("yummyCnt").descending()
                            .and(Sort.by("articleId").descending())));
        }

        return articlePage;
    }

    /*
    * 게시물 삭제
    * */
    public void deleteArticle(Long articleId, Long userId) {
        Article article = findArticle(articleId);
        verifiedUser(article, userId);
        article.getUser().removeArticle(article);
        List<Comment> comments = article.getComments();
        for (int i = comments.size() - 1; i >=0 ; i--) {
            Comment comment = comments.get(i);
            comment.getUser().removeComment(comment);
            comment.getArticle().removeComment(comment);
            commentRepository.delete(comment);
        }

        articleRepository.delete(article);




        /*Optional<Article> optionalArticle = articleRepository.findById(articleId);
        optionalArticle.ifPresentOrElse(article -> {
            if (!Objects.equals(article.getUser().getUserId(), userId)) {
                throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
            }
            articleRepository.delete(article);

        }, () -> {
            return;
        });*/
    }

    /*
    * 쿼리파라미터 필터
    * */
    private String queryFilter(String query, String type) {
        switch (type) {
            case "order":
                switch (query) {
                    case "latest":
                        query = "articleId";
                        break;
                    case "likes":
                        query = "likeCnt";
                        break;
                    case "views":
                        break;
                    default:
                        throw new BusinessLogicException(ExceptionCode.BAD_QUERY); //case 에 맞지않는 쿼리는 전부 예외처리
                }
                break;
            case "sort":
                switch (query) {
                    case "all":
                    case "followings":
                        break;
                    case "dogs":
                        query = "DOG";
                        break;
                    case "cats":
                        query = "CAT";
                        break;
                    case "persons":
                        query = "PERSON";
                        break;
                    default:
                        throw new BusinessLogicException(ExceptionCode.BAD_QUERY); //case 에 맞지않는 쿼리는 전부 예외처리
                }
                break;
            case "tab":
                switch (query) {
                    case "post":
                    case "give":
                    case "take":
                        break;
                    default:
                        throw new BusinessLogicException(ExceptionCode.BAD_QUERY); //case 에 맞지않는 쿼리는 전부 예외처리

                }
                break;
        }

        return query;
    }

    /*
     * 게시물 좋아요
     * */
    public void likeArticle (Long articleId, Long userId) {
        //엔티티 조회
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //좋아요 중복여부 검증
        verifiedArticleLike(articleId, userId);

        //like 생성 후 조회한 엔티티 주입
        Like like = new Like();
        like.addArticle(article);
        like.addUser(user);

        //article의 likeCnt 최신화
        article.changeLikeCnt(article.getLikes().size());
    }

    /*
     * 게시물 좋아요 취소
     * */
    public void deleteLikeArticle (Long articleId, Long userId) {
        //엔티티 조회
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //좋아요 존재여부 검증
        verifiedNotArticleLike(articleId, userId);

        //삭제할 like 조회 후 엔티티 매핑 해제 (Article -> Like로 cascade 된 상태기 때문에 끊어줘야함)
        Like like = findArticleLike(articleId, userId);
        article.removeLike(like);

        //like 삭제
        likeRepository.delete(findArticleLike(articleId, userId));

        //article의 likeCnt 최신화
        article.changeLikeCnt(article.getLikes().size());
    }

    /*
     * 게시물 신고
     * */
    public void reportArticle(Report report, Long articleId, Long userId) {
        //엔티티 조회
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //신고 중복여부 검증
        verifiedReportArticle(articleId, userId);

        //report에 조회한 엔티티 주입
        report.addArticle(article);
        report.addUser(user);

        //article의 reportCnt 최신화
        article.changeReportCnt(article.getReports().size());
    }
    /*
     * 게시물 좋아요 여부 조회
     * */
    @Transactional(readOnly = true)
    private Like findArticleLike(Long articleId, Long userId) {
        return likeRepository.findByArticle_ArticleIdAndUser_UserId(articleId, userId);
    }


    /*
     * 게시물 좋아요 중복여부 검증
     * */
    @Transactional(readOnly = true)
    private void verifiedArticleLike(Long articleId, Long userId) {
        Optional<Like> optionalCommentLike = Optional.ofNullable(findArticleLike(articleId, userId));
        if(optionalCommentLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * 게시물 좋아요 존재여부 검증
     * */
    @Transactional(readOnly = true)
    private void verifiedNotArticleLike(Long articleId, Long userId) {
        Optional<Like> optionalCommentLike = Optional.ofNullable(findArticleLike(articleId, userId));
        if(optionalCommentLike.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * 게시물 좋아요 중복여부 확인
     * */
    @Transactional(readOnly = true)
    public boolean checkLikeArticle(Long articleId, Long userId) {
        try{
            verifiedArticleLike(articleId, userId);
            return false;
        } catch (BusinessLogicException e) {
            return true;
        }
    }

    /*
     * 게시물 신고 여부 조회
     * */
    @Transactional(readOnly = true)
    private Report findArticleReport (Long articleId, Long userId) {
        return reportRepository.findByArticle_ArticleIdAndUser_UserId(articleId, userId);
    }

    /*
     * 게시물 신고 중복여부 검증
     * */
    @Transactional(readOnly = true)
    private void verifiedReportArticle(Long articleId, Long userId) {
        Optional<Report> optionalCommentReport = Optional.ofNullable(findArticleReport(articleId, userId));
        if(optionalCommentReport.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_REPORT);
        }
    }

    public Page<Article> searchArticles(String keyword, int page, int size) {
        return articleRepository.findAllByContentContaining(keyword,
                    PageRequest.of(page, size, Sort.by("articleId").descending()));

        }

}
