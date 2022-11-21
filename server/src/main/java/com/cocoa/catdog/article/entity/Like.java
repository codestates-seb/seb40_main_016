package com.cocoa.catdog.article.entity;

import com.cocoa.catdog.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    //==연관관계 메서드==//
    public void addUser(User user) {
        if(this.user == null) {
            this.user = user;
            user.addLike(this);
        }
    }

    public void addArticle(Article article) {
        if(this.article == null) {
            this.article = article;
            article.addLike(this);

        }
    }

}
