package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {
    Page<Article> findBySearch(Pageable pageable, String sort, String q);
}
