package com.cocoa.catdog.article.service;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.repository.ArticleRepository;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserService userService;
    private final ArticleMapper articleMapper;
//    private final CommentMapper commentMapper;

    public Article saveArticle(Article article, Long userId) {

        User findUser = userService.findVerifiedUser(userId);

        article.setUser(findUser);
        findUser.getArticles().add(article);
        return articleRepository.save(article);
    }



    public Article findVerifiedQuestion(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }
}
