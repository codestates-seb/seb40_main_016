package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByArticle_ArticleIdAndUser_UserId(Long ArticleId, Long userId);
}
