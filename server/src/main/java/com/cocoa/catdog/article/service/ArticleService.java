package com.cocoa.catdog.article.service;

import com.cocoa.catdog.article.entity.Article;
import org.springframework.stereotype.Service;

@Service
public interface ArticleService {
    public Article findArticle(long articleId);
}
