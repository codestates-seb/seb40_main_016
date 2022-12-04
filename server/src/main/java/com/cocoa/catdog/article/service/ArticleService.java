package com.cocoa.catdog.article.service;

import com.amazonaws.util.CollectionUtils;
import com.cocoa.catdog.article.Dto.ArticleImgDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImg;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.article.mapper.ArticleImgMapper;
import com.cocoa.catdog.article.repository.*;
import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.repository.CommentRepository;
import com.cocoa.catdog.config.aws.S3Service;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.message.event.EventService;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleImgRepository articleImgRepository;
    private final UserService userService;
    private final LikeRepository likeRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;
    private final S3Service s3Service;
    private final ApplicationEventPublisher eventPublisher;
    private final ArticleImgMapper mapper;
    private final EventService eventService;


    @Value("${s3.articleDir}")
    private String articleDir;

    /*
     * 게시물 등록
     * */
    @Async
    public void saveArticle(Article article, Long userId, List<MultipartFile> files) throws InterruptedException {
        User findUser = userService.findUser(userId);
        Long articleId = article.getArticleId();
        if (!CollectionUtils.isNullOrEmpty(files)) {
            ArticleImgDto.Post articleImgDto;
            ArticleImg articleImg;

            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String imgUrl = s3Service.uploadFile(articleDir, file);

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
        article = articleRepository.save(article);

        eventService.sendCreateArticleMessage(findUser, article);//<<<<<< sse
    }


    /*
     * 게시물 조회
     * */
    @Transactional(readOnly = true)
    public Article findArticle(Long articleId) {
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
    private void verifiedUser(Article article, Long userId) {
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
    }

    /*
     * 게시물 수정
     * */
    public Article updateArticle(Article newArticle, Long userId) {
        Article article = findVerifiedArticle(newArticle.getArticleId());
        verifiedUser(article, userId);
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
    public Page<Article> findArticles(int page, int size, String sort, String order, String search, long userId) {
        //order로 pageRequest 생성
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(orderFilter(order)).descending()
                .and(Sort.by("articleId").descending()));

        if(sort.equals("followings")) {
            return articleRepository.findBySearchOnFlw(pageRequest, search, userId);
        }
        return articleRepository.findBySearch(pageRequest, sort, search);
        //----------------------------------<<querydsl로 리팩토링 하기 전>>-----------------------------//
        //글목록을 쿼리별로 조회
        /*
        Page<Article> articlePage;
        if (sort.equals("followings")) {
            User user = userService.findUser(userId);
            List<Long> followedUsers = user.getFollowingUsers().stream()
                    .map(followingUser -> followingUser.getFollowedUser().getUserId())
                    .collect(Collectors.toList());
            articlePage = articleRepository.findBySearchAndFollowing(pageRequest, followedUsers, search);
        } else {
            articlePage = articleRepository.findBySearch(pageRequest, sort, search);
        }
        return articlePage;
        */
        //----------------------------------------------------------------------------------------------//
    }

    /*
     * 마이페이지 게시물 조회
     * */
    @Transactional(readOnly = true)
    public Page<Article> findProfileArticles(int page, int size, String tab, Long userId) {
        Page<Article> articlePage;

        switch (tab) {
            case "post":
                articlePage = articleRepository.findByUser_UserId(userId, PageRequest.of(page, size, Sort.by("articleId").descending()));
                break;
            case "give":
                articlePage = articleRepository.findByProfileOnGive(PageRequest.of(page, size), userId);
                break;
            case "take":
                User user = userService.findUser(userId);
                if (user.getUserType() == User.UserType.PERSON) {
                    throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
                }
                articlePage = articleRepository.findByUser_UserId(userId,(PageRequest.of(page, size, Sort.by("yummyCnt").descending()
                        .and(Sort.by("articleId").descending()))));
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.BAD_QUERY);
        }

        return articlePage;
        //----------------------------------<<querydsl로 리팩토링 하기 전>>-------------------------------//
        /*PageRequest pageRequest;
        if(tab.equals("take")) {
            pageRequest = PageRequest.of(page, size, Sort.by("articleId").descending());
        } else {
            pageRequest = PageRequest.of(page, size, Sort.by("YummyCnt").descending()
                    .and(Sort.by("articleId").descending()));
        }

        return articleRepository.findByProfile(pageRequest, tab, userId);

        //-----------------------------------------------------------------------------------------------//
        Page<Article> articlePage;
        switch (tab) {
            case "post":
                articlePage = articleRepository.findByUser_UserId(userId, pageRequest);
                break;
            case "give":
                List<Long> articleIdList = userService.findUser(userId).getWallet().getGives().stream()
                        .map(giveTake -> giveTake.getArticle().getArticleId())
                        .collect(Collectors.toList());
                articlePage = articleRepository.findByArticleIdIn(articleIdList, pageRequest);
                break;
            case "take":
                User user = userService.findUser(userId);
                if (user.getUserType() == User.UserType.PERSON) {
                    throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
                }
                articlePage = articleRepository.findAll(PageRequest.of(page, size, Sort.by("yummyCnt").descending()
                        .and(Sort.by("articleId").descending())));
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.BAD_QUERY);
        }

        return articlePage;
        */
        //--------------------------------------------------------------------------------------------//
    }
    public Page<Integer> findYummyByProfileOnGive(int page, int size, Long userId) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return articleRepository.findYummyByProfileOnGive(pageRequest, userId);
    }


    /*
     * 게시물 삭제
     * */
    public void deleteArticle(Long articleId, Long userId) {
        Article article = findArticle(articleId);
        verifiedUser(article, userId);
        article.getUser().removeArticle(article);
        List<Comment> comments = article.getComments();
        for (int i = comments.size() - 1; i >= 0; i--) {
            Comment comment = comments.get(i);
            comment.getUser().removeComment(comment);
            comment.getArticle().removeComment(comment);
            commentRepository.delete(comment);
        }

        articleRepository.delete(article);

    }

    /*
     * order 쿼리 필터
     * */
    private String orderFilter(String order) {
        switch (order) {
            case "latest":
                order = "articleId";
                break;
            case "likes":
                order = "likeCnt";
                break;
            case "views":
                break;
            default:
                throw new BusinessLogicException(ExceptionCode.BAD_QUERY); //case 에 맞지않는 쿼리는 전부 예외처리
        }
        return order;
    }

    /*
     * 게시물 좋아요
     * */
    public void likeArticle(Long articleId, Long userId) {
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
    public void deleteLikeArticle(Long articleId, Long userId) {
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

        //신고누적횟수가 1이상일시 게시물을 신고상태로 변경
        if(article.getReportCnt() >= 1) {
            isReportedArticle(article);
            User articleUser = article.getUser();
            articleUser.changeReportedArticleCnt(articleUser.getReportedArticleCnt() + 1);
            //위의 결과로 인해 신고된 게시물이 2이상일시 유저를 휴면상태로 변경
            if(articleUser.getReportedArticleCnt() >= 2) {
                userService.isSleptUser(articleUser);
            }
        }
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
        if (optionalCommentLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * 게시물 좋아요 존재여부 검증
     * */
    @Transactional(readOnly = true)
    private void verifiedNotArticleLike(Long articleId, Long userId) {
        Optional<Like> optionalCommentLike = Optional.ofNullable(findArticleLike(articleId, userId));
        if (optionalCommentLike.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * 게시물 좋아요 중복여부 확인
     * */
    @Transactional(readOnly = true)
    public boolean checkLikeArticle(Long articleId, Long userId) {
        try {
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
    private Report findArticleReport(Long articleId, Long userId) {
        return reportRepository.findByArticle_ArticleIdAndUser_UserId(articleId, userId);
    }

    /*
     * 게시물 신고 중복여부 검증
     * */
    @Transactional(readOnly = true)
    private void verifiedReportArticle(Long articleId, Long userId) {
        Optional<Report> optionalCommentReport = Optional.ofNullable(findArticleReport(articleId, userId));
        if (optionalCommentReport.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_REPORT);
        }
    }

    /*
    * 게시물 조회수 증가
    * */
    public void increaseViews(Article article) {
        article.IncreaseViews();
        articleRepository.save(article);
    }

    /*
    * 신고 누적시 일반 게시물을 신고된 게시물 상태로 변경
    * */
    private void isReportedArticle(Article article) {
        article.changeArticleStatus(Article.ArticleStatus.REPORTED);
    }

    public Page<Article> searchArticles(String keyword, int page, int size) {
        return articleRepository.findAllByContentContaining(keyword,
                PageRequest.of(page, size, Sort.by("articleId").descending()));

    }

    public void addImage(Long userId, List<MultipartFile> files, Long articleId) {
        Article article = findArticle(articleId);
        verifiedUser(article, userId);
//            if (files.size() == 0) throw new BusinessLogicException(ExceptionCode.NO_FILE_SELECTED);

        if (!CollectionUtils.isNullOrEmpty(files)) {
            ArticleImgDto.Post articleImgDto;
            ArticleImg articleImg;
            List<ArticleImg> articleImgList = article.getArticleImg();
            for (MultipartFile file : files) {
                String imgUrl = s3Service.uploadFile(articleDir, file);

                articleImgDto = ArticleImgDto.Post.builder()
                        .imgUrl(imgUrl)
                        .article(article)
                        .build();
                articleImg = new ArticleImg(
                        articleImgDto.getImgUrl());
                articleImg.setArticle(article);

                article.getArticleImg().add(articleImg);
                articleImgRepository.save(articleImg);
            }
        }
        articleRepository.save(article);
    }

    public void deleteImage(Long userId, List<String> urlList, Long  articleId) {
        Article article = findArticle(articleId);
        verifiedUser(article, userId);

        for (String url : urlList) {
            String originalFileName = url.split("amazonaws.com/")[1];
            s3Service.removeS3File(originalFileName);
            articleImgRepository.delete(articleImgRepository.findByImgUrl(url));
        }
    }


}
