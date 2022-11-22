package com.cocoa.catdog.comment.dto;

import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentResponseDto {
    private Long commentId;
    private String content;
    private int likeCnt;
    private int reportCnt;
    private LocalDateTime createdAt;
    private Comment.CommentStatus commentStatus;
    private boolean gotLiked;
    private UserSimpleResponseDto user;

    public void addGotLiked(boolean gotLiked) {
        this.gotLiked = gotLiked;
    }
}
