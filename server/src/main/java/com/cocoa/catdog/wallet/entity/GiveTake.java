package com.cocoa.catdog.wallet.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GiveTake extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long giveTakeId;

    private int giveYummy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GIVE_WLT_ID")
    private Wallet giveWlt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAKE_WLT_ID")
    private Wallet takeWlt;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Builder
    public GiveTake (Long giveTakeId, int giveYummy) {
        this.giveTakeId = giveTakeId;
        this.giveYummy = giveYummy;
    }

    //==연관관계 메소드==//
    public void addArticle (Article article) {
        if(this.article == null) {
            this.article = article;
            article.addGiveTake(this);
        }
    }

    public void addGiveWlt (Wallet wallet) {
        if(this.giveWlt == null) {
            this.giveWlt = wallet;
            wallet.addGive(this);
        }
    }

    public void addTakeWlt (Wallet wallet) {
        if(this.takeWlt == null) {
            this.takeWlt = wallet;
            wallet.addTake(this);
        }
    }

}
