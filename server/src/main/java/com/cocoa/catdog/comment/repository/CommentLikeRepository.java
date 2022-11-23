package com.cocoa.catdog.comment.repository;

import com.cocoa.catdog.comment.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByComment_CommentIdAndUser_UserId(Long commentId, Long userId);
}
