package com.cocoa.catdog.article.Dto;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImage;
import com.cocoa.catdog.user.dto.UserDto;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class ArticleDto {

    @Getter
    @Builder
    public static class Response {
        private Long articleId;
        private String content;
        private int likeCnt;
        private int views;
        private int reportCnt;
        private int YummyCnt;
        private LocalDateTime createdAt;
        private Article.ArticleStatus articleStatus;
        private boolean gotLiked;
        private UserSimpleResponseDto user;

        public void addGotLiked(boolean gotLiked) {
            this.gotLiked = gotLiked;
        }

        private List<ArticleImage> articleImage;




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
    @Builder
    public static class Patch {
        private Long articleId;
        private String articleImg;
        private String content;

        public  void setArticleId(Long articleId) {this.articleId = articleId;}
    }

    @Getter
    public static class Report {
        @NotBlank
        private String content;
    }



}
