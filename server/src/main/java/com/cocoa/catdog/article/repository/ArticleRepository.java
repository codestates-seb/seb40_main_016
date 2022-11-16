package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
