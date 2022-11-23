package com.cocoa.catdog.article.entity;

import com.cocoa.catdog.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Builder
    public Report (Long reportId, String content) {
        this.reportId = reportId;
        this.content = content;
    }

    //==연관관계 메서드==//
    public void addUser(User user) {
        if(this.user == null) {
            this.user = user;
            user.addReport(this);
        }
    }

    public void addArticle(Article article) {
        if(this.article == null) {
            this.article = article;
            article.addReport(this);

        }
    }
}
