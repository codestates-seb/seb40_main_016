package com.cocoa.catdog.article.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

}
