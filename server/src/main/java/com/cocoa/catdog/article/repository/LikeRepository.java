package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByArticle_ArticleIdAndUser_UserId(Long ArticleId, Long userId);
}
