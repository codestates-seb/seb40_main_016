package com.cocoa.catdog.article.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;

    @Column(nullable = false)
    private String content;
}
