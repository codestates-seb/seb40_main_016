package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleRepositoryCustom {
    Page<Article> findBySearch(Pageable pageable, String sort, String search);

    Page<Article> findByProfile(Pageable pageable, String tab, Long userId);

    Page<Article> findBySearchOnFlw(Pageable pageable, String search, Long userId);
}
