package com.cocoa.catdog.article.Dto;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class ArticleImgDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post extends ArticleImgDto{
        private String imgUrl;
        private Article article;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response extends ArticleImgDto {

        private List<ArticleImg> images;



    }


}
