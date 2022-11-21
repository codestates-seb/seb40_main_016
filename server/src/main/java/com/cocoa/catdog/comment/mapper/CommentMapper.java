package com.cocoa.catdog.comment.mapper;

import com.cocoa.catdog.comment.dto.CommentDto;
import com.cocoa.catdog.comment.dto.CommentResponseDto;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentReport;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment postToComment(CommentDto.Post post);
    Comment patchToComment(CommentDto.Patch patch);
    CommentReport reportToCommentReport(CommentDto.Report report);
    CommentResponseDto commentToResponse(Comment comment);
    List<CommentResponseDto> commentsToResponses(List<Comment> comments);
}
