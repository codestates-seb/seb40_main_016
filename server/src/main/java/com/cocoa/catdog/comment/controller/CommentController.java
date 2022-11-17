package com.cocoa.catdog.comment.controller;

import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.comment.dto.CommentDto;
import com.cocoa.catdog.comment.dto.CommentResponseDto;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentReport;
import com.cocoa.catdog.comment.mapper.CommentMapper;
import com.cocoa.catdog.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final JwtTokenizer jwtTokenizer;


    /*
    * 댓글 등록
    * */
    @PostMapping("/{article-id}")
    public ResponseEntity<CommentResponseDto> postComment (@RequestBody @Valid CommentDto.Post postDto,
                                                           @PathVariable("article-id") Long articleId,
                                                           @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        Comment comment = commentMapper.postToComment(postDto);
        Comment createdComment = commentService.createComment(comment, articleId, userId);

        return new ResponseEntity<>(commentMapper.commentToResponse(createdComment), HttpStatus.CREATED);
    }

    /*
    * 댓글 수정
    * */
    @PatchMapping("/{comment-id}")
    public ResponseEntity<CommentResponseDto> patchComment (@RequestBody @Valid CommentDto.Patch patchDto,
                                                            @PathVariable("comment-id") Long commentId,
                                                            @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        Comment comment = commentMapper.patchToComment(patchDto);
        Comment updatedComment = commentService.updateComment(comment, commentId);

        return new ResponseEntity<>(commentMapper.commentToResponse(updatedComment), HttpStatus.OK);
    }

    /*
    * 댓글 삭제
    * */
    @DeleteMapping("/{comment-id}")
    public ResponseEntity<HttpStatus> deleteComment (@PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
    * 댓글 좋아요
    * */
    @PostMapping("/{comment-id}/likes")
    public ResponseEntity<HttpStatus> likeComment (@PathVariable("comment-id") Long commentId,
                                                   @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        commentService.likeComment(commentId, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    * 댓글 신고
    * */
    @PostMapping("/{comment-id}/report")
    public ResponseEntity<HttpStatus> reportComment (@PathVariable("comment-id") Long commentId,
                                                     @RequestBody @Valid CommentDto.Report reportDto,
                                                     @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        CommentReport commentReport = commentMapper.reportToCommentReport(reportDto);
        commentService.reportComment(commentReport, commentId, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
