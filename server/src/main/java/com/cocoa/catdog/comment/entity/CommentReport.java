package com.cocoa.catdog.comment.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CommentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentReportId;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

}