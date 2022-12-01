package com.cocoa.catdog.article.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.wallet.entity.GiveTake;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "articles")
public class Article extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    @Column(length = 200)
    private String content;


    private int likeCnt;

    private int views;

    private int reportCnt;

    private int yummyCnt;

    @Enumerated(value = EnumType.STRING)
    private ArticleStatus articleStatus = ArticleStatus.PUBLIC;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<GiveTake> giveTakes = new ArrayList<>();

    @JsonIgnoreProperties({"articles"})
    @JsonManagedReference
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private List<ArticleImg> articleImg = new ArrayList<>();

//    public List<String> getImages(Long articleId) {
//
//    }

    //==생성자==//
    @Builder
    public Article (Long articleId, String content) {
        this.articleId = articleId;
        this.content = content;
    }

    public void IncreaseViews() {
        this.views++;
    }
    //==수정 메서드==//
    public void changeContent (String content) {
        if(content != null) {
            this.content = content;
        }
    }

    public void changeLikeCnt(int likeCnt) {
        this.likeCnt = likeCnt;
    }

    public void changeReportCnt(int reportCnt) {
        this.reportCnt = reportCnt;
    }

    public void changeYummyCnt(int yummyCnt) {
        this.yummyCnt = yummyCnt;
    }

    public void changeArticleStatus(ArticleStatus articleStatus) {
        this.articleStatus = articleStatus;
    }

    //==연관관계 메서드==//
    public void addUser(User user) {
        if(this.user == null) {
            this.user = user;
            user.addArticle(this);
        }
    }
    public void addComment (Comment comment) {
        if(!comments.contains(comment)) {
            comments.add(comment);
            comment.addArticle(this);
        }

    }

    public void removeComment (Comment comment) {
        comments.remove(comment);
    }

    public void addLike(Like like) {
        if(!likes.contains(like)) {
            likes.add(like);
            like.addArticle(this);
        }
    }

    public void addReport(Report report) {
        if(!reports.contains(report)) {
            reports.add(report);
            report.addArticle(this);
        }
    }

    public void removeLike(Like like) {
        likes.remove(like);
    }

    public void addGiveTake(GiveTake giveTake) {
        if(!giveTakes.contains(giveTake)) {
            giveTakes.add(giveTake);
            giveTake.addArticle(this);
        }
    }

    public enum ArticleStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        REPORTED("신고됨");

        @Getter
        private String status;

        ArticleStatus(String status) {this.status = status;}
    }

}
