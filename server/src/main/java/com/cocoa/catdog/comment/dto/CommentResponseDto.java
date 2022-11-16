package com.cocoa.catdog.comment.dto;

import com.cocoa.catdog.comment.entity.Comment;

public class CommentResponseDto {
    private Long commentId;
    private String content;
    private int likeCnt;
    private int reportCnt;
    private Comment.CommentStatus commentStatus;
}
