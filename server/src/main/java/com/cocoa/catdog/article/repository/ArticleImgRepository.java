package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.ArticleImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleImgRepository extends JpaRepository<ArticleImg, Long> {

    ArticleImg findByImgUrl(String imgUrl);

    ArticleImg findByArticleImgId(long articleImgId);


}
