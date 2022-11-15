package com.cocoa.catdog.article.Dto;

import com.cocoa.catdog.article.entity.Article;
import lombok.*;

public class ArticleDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long articleId;
        private String articleImg;
        private String content;
        private int likeCnt;
        private int view;
        private int reportCnt;
        private int YummyCnt;
        private Article.ArticleStatus articleStatus;


    }


}
