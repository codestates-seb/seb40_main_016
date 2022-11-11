package com.cocoa.catdog.comment.entity;

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

}
