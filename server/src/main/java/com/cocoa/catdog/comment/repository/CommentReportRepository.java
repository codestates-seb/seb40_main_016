package com.cocoa.catdog.comment.repository;

import com.cocoa.catdog.comment.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {
    CommentReport findByComment_CommentIdAndUser_UserId(Long commentId, Long userId);
}
