package com.cocoa.catdog.article.Dto;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.user.dto.UserDto;
import lombok.*;

import javax.validation.constraints.NotBlank;

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

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post {
        @NotBlank
        private String articleImg;
        @NotBlank
        private String content;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Patch {
        private Long articleId;
        @NotBlank
        private String articleImg;
        @NotBlank
        private String content;

        public  void setArticleId(Long articleId) {this.articleId = articleId;}
    }


}
