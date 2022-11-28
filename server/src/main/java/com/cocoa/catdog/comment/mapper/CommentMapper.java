package com.cocoa.catdog.comment.mapper;

import com.cocoa.catdog.comment.dto.CommentDto;
import com.cocoa.catdog.comment.dto.CommentResponseDto;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentReport;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment postToComment(CommentDto.Post post);
    Comment patchToComment(CommentDto.Patch patch);
    CommentReport reportToCommentReport(CommentDto.Report report);
    default CommentResponseDto.Normal commentToResponse(Comment comment) {
        return CommentResponseDto.Normal.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .likeCnt(comment.getLikeCnt())
                .reportCnt(comment.getReportCnt())
                .createdAt(comment.getCreatedAt())
                .commentStatus(comment.getCommentStatus())
                .user(
                        UserSimpleResponseDto.builder()
                                .userId(comment.getUser().getUserId())
                                .userName(comment.getUser().getUserName())
                                .userImg(comment.getUser().getUserImg())
                                .userStatus(comment.getUser().getUserStatus())
                                .build()
                ).build();
    }
    List<CommentResponseDto.Normal> commentsToResponses(List<Comment> comments);
    default CommentResponseDto.Profile commentToProfileResponse(Comment comment) {
        return CommentResponseDto.Profile.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .likeCnt(comment.getLikeCnt())
                .reportCnt(comment.getReportCnt())
                .articleId(comment.getArticle().getArticleId())
                .createdAt(comment.getCreatedAt())
                .commentStatus(comment.getCommentStatus())
                .build();
    }
    List<CommentResponseDto.Profile> commentsToProfileResponses(List<Comment> comments);

}
