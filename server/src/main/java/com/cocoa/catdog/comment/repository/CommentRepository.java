package com.cocoa.catdog.comment.repository;

import com.cocoa.catdog.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
