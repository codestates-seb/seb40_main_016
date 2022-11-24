package com.cocoa.catdog.comment.repository;

import com.cocoa.catdog.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByArticle_ArticleId(Long articleId, Pageable pageable);
}
