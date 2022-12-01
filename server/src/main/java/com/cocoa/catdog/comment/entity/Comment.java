package com.cocoa.catdog.comment.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, length = 200)
    private String content;

    private int likeCnt;

    private int reportCnt;

    @Enumerated(value = EnumType.STRING)
    private CommentStatus commentStatus = CommentStatus.PUBLIC;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentReport> commentReports = new ArrayList<>();

    //==생성자==//
    @Builder
    public Comment (Long commentId, String content) {
        this.commentId = commentId;
        this.content = content;
    }

    //==수정 메서드==//
    public void changeContent (String content) {
        if(content != null) {
            this.content = content;
        }
    }

    public void changeLikeCnt (int likeCnt) {
        this.likeCnt = likeCnt;
    }

    public void changeReportCnt (int reportCnt) {
        this.reportCnt = reportCnt;
    }


    //==연관관계 메서드==//
    public void addUser (User user) {
        if(getUser() == null) {
            this.user = user;
            user.addComment(this);
        }
    }

    public void addArticle(Article article) {
        if(getArticle() == null) {
            this.article = article;
            article.addComment(this);
        }
    }

    public void addCommentLike(CommentLike commentLike) {
        if(!commentLikes.contains(commentLike)) {
            commentLikes.add(commentLike);
            commentLike.addComment(this);
        }
    }

    public void addCommentReport(CommentReport commentReport) {
        if(!commentReports.contains(commentReport)) {
            commentReports.add(commentReport);
            commentReport.addComment(this);
        }
    }

    public void removeCommentLike(CommentLike commentLike) {
        commentLikes.remove(commentLike);
    }

    //==댓글 상태==//
    public enum CommentStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        REPORTED("신고됨");

        @Getter
        private String status;

        CommentStatus(String status) {this.status = status;}
    }

}
