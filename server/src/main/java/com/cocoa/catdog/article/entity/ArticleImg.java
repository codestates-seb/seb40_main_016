package com.cocoa.catdog.article.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ARTICLEIMAGES")
public class ArticleImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleImgId;

    @Column(nullable = false)
    private String imgUrl;

    @JsonIgnore
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @Builder
    public ArticleImg(String imgUrl) {
        this.imgUrl = imgUrl;
    }



}
