package com.cocoa.catdog.comment.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class CommentDto {
    @Getter
    public static class Post {
        @NotBlank
        private String content;
    }
    @Getter
    public static class Patch {

        private Long commentId;

        @NotBlank
        private String content;

        public Long addCommentId(Long commentId) {
            this.commentId = commentId;
            return this.commentId;
        }
    }

    @Getter
    public static class Report {
        @NotBlank
        private String content;
    }
}
