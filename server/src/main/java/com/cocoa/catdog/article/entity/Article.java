package com.cocoa.catdog.article.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    @Column(nullable = false)
    private String articleImg;

    @Column(length = 200)
    private String content;


    private int likeCnt;

    private int  views;

    private int reportCnt;

    private int yummyCnt;

    @Enumerated(value = EnumType.STRING)
    private ArticleStatus articleStatus = ArticleStatus.PUBLIC;

    public enum ArticleStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        REPORTED("신고됨");

        @Getter
        private String status;

        ArticleStatus(String status) {this.status = status;}
    }

}
