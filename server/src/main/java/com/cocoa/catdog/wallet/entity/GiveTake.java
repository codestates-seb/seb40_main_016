package com.cocoa.catdog.wallet.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

}
