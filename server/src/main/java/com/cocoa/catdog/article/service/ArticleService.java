package com.cocoa.catdog.article.service;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.repository.ArticleRepository;
import com.cocoa.catdog.comment.mapper.CommentMapper;
import com.cocoa.catdog.config.aws.S3Uploader;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserService userService;
    private final ArticleMapper articleMapper;
    private final CommentMapper commentMapper;
    private final S3Uploader s3Uploader;

    public Article saveArticle(Article article, Long userId, List<MultipartFile> files) {

        User findUser = userService.findUser(userId);

//        findUser.setArticles();


        List<String> imgUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalFileName = file.getOriginalFilename();
            String imgUrl = s3Uploader.uploadFile("article", file);
            imgUrls.add(imgUrl);


        }



        article.setUser(findUser);
        findUser.getArticles().add(article);
        return articleRepository.save(article);
    }

    public Article findArticle(Long articleId){
        return findVerifiedArticle(articleId);
    }

    private Article findVerifiedArticle(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    public Article updateArticle(Article newArticle, Long userId) {
        Article article = findVerifiedArticle(newArticle.getArticleId());

        if (!article.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        article.setArticleImg(newArticle.getArticleImg());
        article.setContent(newArticle.getContent());

        return article;
    }

    public Page<Article> findArticles(int page, int size) {
        return articleRepository.findAll(PageRequest.of(
                page, size, Sort.by("articleId").descending()));
    }

    public void deleteArticle(Long articleId, Long userId) {
        Optional<Article> optionalArticle = articleRepository.findById(articleId);
        optionalArticle.ifPresentOrElse(article -> {
            if (!Objects.equals(article.getUser().getUserId(), userId)) {
                throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
            }
            articleRepository.delete(article);

        }, () -> {
            return;
        });
    }



}
