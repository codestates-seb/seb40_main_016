package com.cocoa.catdog.comment.entity;

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

    public enum CommentStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        REPORTED("신고됨");

        @Getter
        private String status;

        CommentStatus(String status) {this.status = status;}
    }

}
