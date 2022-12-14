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
import com.cocoa.catdog.message.SseEmitterService;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.repository.UserRepository;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    private final UserRepository userRepository;
    private final UserService userService;
    private final LikeRepository likeRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;
    private final S3Service s3Service;
    private final SseEmitterService sseEmitterService;
    private final ApplicationEventPublisher eventPublisher;
    private final ArticleImgMapper mapper;


    @Value("${s3.articleDir}")
    private String articleDir;

    /*
     * ????????? ??????
     * */
    public Article saveArticle(Article article, Long userId, List<MultipartFile> files) {

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
        return articleRepository.save(article);
    }

    //?????????
    public Article saveArticleTest(Article article, Long userId) {
        User findUser = userService.findUser(userId);
        article.addUser(findUser);

        eventPublisher.publishEvent(findUser);
        return articleRepository.save(article);
    }

    /*
     * ????????? ??????
     * */
    @Transactional(readOnly = true)
    public Article findArticle(Long articleId) {
        return findVerifiedArticle(articleId);
    }

    /*
     * ????????? ???????????? ??????
     * */
    @Transactional(readOnly = true)
    private Article findVerifiedArticle(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    /*
     * ????????? ????????? ?????? ??????
     * */
    @Transactional(readOnly = true)
    private void verifiedUser(Article article, Long userId) {
        if (!article.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
    }

    /*
     * ????????? ??????
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
     * ????????? ?????? ??????
     * */
    @Transactional(readOnly = true)
    public Page<Article> findArticles(int page, int size, String sort, String order, String search, long userId) {
        //order??? pageRequest ??????
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(orderFilter(order)).descending()
                .and(Sort.by("articleId").descending()));

        if(sort.equals("followings")) {
            return articleRepository.findBySearchOnFlw(pageRequest, search, userId);
        }
        return articleRepository.findBySearch(pageRequest, sort, search);
        //----------------------------------<<querydsl??? ???????????? ?????? ???>>-----------------------------//
        //???????????? ???????????? ??????
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
     * ??????????????? ????????? ??????
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
        //----------------------------------<<querydsl??? ???????????? ?????? ???>>-------------------------------//
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
     * ????????? ??????
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
     * order ?????? ??????
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
                throw new BusinessLogicException(ExceptionCode.BAD_QUERY); //case ??? ???????????? ????????? ?????? ????????????
        }
        return order;
    }

    /*
     * ????????? ?????????
     * */
    public void likeArticle(Long articleId, Long userId) {
        //????????? ??????
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //????????? ???????????? ??????
        verifiedArticleLike(articleId, userId);

        //like ?????? ??? ????????? ????????? ??????
        Like like = new Like();
        like.addArticle(article);
        like.addUser(user);

        //article??? likeCnt ?????????
        article.changeLikeCnt(article.getLikes().size());
    }

    /*
     * ????????? ????????? ??????
     * */
    public void deleteLikeArticle(Long articleId, Long userId) {
        //????????? ??????
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //????????? ???????????? ??????
        verifiedNotArticleLike(articleId, userId);

        //????????? like ?????? ??? ????????? ?????? ?????? (Article -> Like??? cascade ??? ????????? ????????? ???????????????)
        Like like = findArticleLike(articleId, userId);
        article.removeLike(like);

        //like ??????
        likeRepository.delete(findArticleLike(articleId, userId));

        //article??? likeCnt ?????????
        article.changeLikeCnt(article.getLikes().size());
    }

    /*
     * ????????? ??????
     * */
    public void reportArticle(Report report, Long articleId, Long userId) {
        //????????? ??????
        Article article = findArticle(articleId);
        User user = userService.findUser(userId);

        //?????? ???????????? ??????
        verifiedReportArticle(articleId, userId);

        //report??? ????????? ????????? ??????
        report.addArticle(article);
        report.addUser(user);

        //article??? reportCnt ?????????
        article.changeReportCnt(article.getReports().size());

        //????????????????????? 1???????????? ???????????? ??????????????? ??????
        if(article.getReportCnt() >= 1) {
            isReportedArticle(article);
            User articleUser = article.getUser();
            articleUser.changeReportedArticleCnt(articleUser.getReportedArticleCnt() + 1);
            //?????? ????????? ?????? ????????? ???????????? 2???????????? ????????? ??????????????? ??????
            if(articleUser.getReportedArticleCnt() >= 2) {
                userService.isSleptUser(articleUser);
            }
        }
    }

    /*
     * ????????? ????????? ?????? ??????
     * */
    @Transactional(readOnly = true)
    private Like findArticleLike(Long articleId, Long userId) {
        return likeRepository.findByArticle_ArticleIdAndUser_UserId(articleId, userId);
    }


    /*
     * ????????? ????????? ???????????? ??????
     * */
    @Transactional(readOnly = true)
    private void verifiedArticleLike(Long articleId, Long userId) {
        Optional<Like> optionalCommentLike = Optional.ofNullable(findArticleLike(articleId, userId));
        if (optionalCommentLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * ????????? ????????? ???????????? ??????
     * */
    @Transactional(readOnly = true)
    private void verifiedNotArticleLike(Long articleId, Long userId) {
        Optional<Like> optionalCommentLike = Optional.ofNullable(findArticleLike(articleId, userId));
        if (optionalCommentLike.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_EXIST_ARTICLE_LIKE);
        }
    }

    /*
     * ????????? ????????? ???????????? ??????
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
     * ????????? ?????? ?????? ??????
     * */
    @Transactional(readOnly = true)
    private Report findArticleReport(Long articleId, Long userId) {
        return reportRepository.findByArticle_ArticleIdAndUser_UserId(articleId, userId);
    }

    /*
     * ????????? ?????? ???????????? ??????
     * */
    @Transactional(readOnly = true)
    private void verifiedReportArticle(Long articleId, Long userId) {
        Optional<Report> optionalCommentReport = Optional.ofNullable(findArticleReport(articleId, userId));
        if (optionalCommentReport.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_ARTICLE_REPORT);
        }
    }

    /*
    * ????????? ????????? ??????
    * */
    public void increaseViews(Article article) {
        article.IncreaseViews();
        articleRepository.save(article);
    }

    /*
    * ?????? ????????? ?????? ???????????? ????????? ????????? ????????? ??????
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
