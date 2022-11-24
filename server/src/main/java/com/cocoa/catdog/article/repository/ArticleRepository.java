package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Page<Article> findByUser_UserType(User.UserType userType, Pageable pageable);
    Page<Article> findByUser_UserIdIn(List<Long> userIdList, Pageable pageable);
}
