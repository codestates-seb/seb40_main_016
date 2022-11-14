package com.cocoa.catdog.comment.entity;

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
@AllArgsConstructor
@Builder
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

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<CommentReport> commentReports = new ArrayList<>();

    public enum CommentStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        REPORTED("신고됨");

        @Getter
        private String status;

        CommentStatus(String status) {this.status = status;}
    }

}
