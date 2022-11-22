package com.cocoa.catdog.comment.service;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentLike;
import com.cocoa.catdog.comment.entity.CommentReport;
import com.cocoa.catdog.comment.repository.CommentLikeRepository;
import com.cocoa.catdog.comment.repository.CommentReportRepository;
import com.cocoa.catdog.comment.repository.CommentRepository;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final UserService userService;
    private final ArticleService articleService;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentReportRepository commentReportRepository;

    /*
    * 댓글 생성
    * */
    @Transactional
    public Comment createComment (Comment comment, Long articleId, Long userId) {
        User user = userService.findUser(userId);
        comment.addUser(user);                      //comment에 user(작성자) 주입

        Article article = articleService.findArticle(articleId);
        article.addComment(comment);                //article에 comment(댓글) 주입

        return commentRepository.save(comment);
    }

    /*
    * 댓글 수정
    * */
    @Transactional
    public Comment updateComment (Comment comment, Long commentId, Long userId) {
        Comment findComment = findComment(commentId);
        verifiedUser(findComment, userId);
        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.changeContent(content));
        System.out.println("asd"+comment.getContent());
        return findComment;
    }

    /*
    * 댓글 조회 (by id)
    * */
    public Comment findComment (Long commentId) {
        Optional<Comment> optionalComment =
                commentRepository.findById(commentId);
        return optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

    /*
    * 댓글리스트 조회 (to page)
    * */
    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    /*
    * 댓글 삭제
    * */
    @Transactional
    public void deleteComment (Long commentId, Long userId) {
        Comment comment = findComment(commentId);
        verifiedUser(comment, userId);
        comment.getUser().removeComment(comment); //user의 comments에서 comment 삭제
        comment.getArticle().removeComment(comment); //article의 comments에서 comment 삭제

        commentRepository.delete(comment);
    }

    /*
    * 댓글 작성자 일치 검증
    * */
    private void verifiedUser (Comment comment, Long userId) {
        if(!comment.getUser().getUserId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
    }

    /*
    * 댓글 좋아요
    * */
    @Transactional
    public void likeComment (Long commentId, Long userId) {
        //엔티티 조회
        Comment comment = findComment(commentId);
        User user = userService.findUser(userId);

        //좋아요 중복여부 검증
        verifiedCommentLike(commentId, userId);

        //commentLike 생성 후 조회한 엔티티 주입
        CommentLike commentLike = new CommentLike();
        commentLike.addComment(comment);
        commentLike.addUser(user);

        //comment의 likeCnt 최신화
        comment.changeLikeCnt(comment.getCommentLikes().size());
    }

    /*
     * 댓글 좋아요 취소
     * */
    @Transactional
    public void deleteLikeComment (Long commentId, Long userId) {
        //엔티티 조회
        Comment comment = findComment(commentId);
        User user = userService.findUser(userId);

        //좋아요 존재여부 검증
        verifiedNotCommentLike(commentId, userId);

        //삭제할 commentLike 조회 후 엔티티 매핑 해제 (Comment -> CommentLike로 cascade 된 상태기 때문에 끊어줘야함)
        CommentLike commentLike = findCommentLike(commentId, userId);
        comment.removeCommentLike(commentLike);

        //commentLike 삭제
        commentLikeRepository.delete(findCommentLike(commentId, userId));

        //comment의 likeCnt 최신화
        comment.changeLikeCnt(comment.getCommentLikes().size());
    }

    /*
    * 댓글 신고
    * */
    @Transactional
    public void reportComment(CommentReport commentReport, Long commentId, Long userId) {
        //엔티티 조회
        Comment comment = findComment(commentId);
        User user = userService.findUser(userId);

        //신고 중복여부 검증
        verifiedReportComment(commentId, userId);

        //commentReport에 조회한 엔티티 주입
        commentReport.addComment(comment);
        commentReport.addUser(user);

        //comment의 reportCnt 최신화
        comment.changeReportCnt(comment.getCommentReports().size());
    }
    /*
    * 댓글 좋아요 여부 조회
    * */
    private CommentLike findCommentLike(Long commentId, Long userId) {
        return commentLikeRepository.findByComment_CommentIdAndUser_UserId(commentId, userId);
    }


    /*
    * 댓글 좋아요 중복여부 검증
    * */
    private void verifiedCommentLike(Long commentId, Long userId) {
        Optional<CommentLike> optionalCommentLike = Optional.ofNullable(findCommentLike(commentId, userId));
        if(optionalCommentLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_COMMENT_LIKE);
        }
    }

    /*
    * 댓글 좋아요 존재여부 검증
    * */
    private void verifiedNotCommentLike(Long commentId, Long userId) {
        Optional<CommentLike> optionalCommentLike = Optional.ofNullable(findCommentLike(commentId, userId));
        if(optionalCommentLike.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_EXIST_COMMENT_LIKE);
        }
    }

    /*
    * 댓글 좋아요 중복여부 확인
    * */
    public boolean checkLikeComment(Long commentId, Long userId) {
        try{
            verifiedCommentLike(commentId, userId);
            return false;
        } catch (BusinessLogicException e) {
            return true;
        }
    }

    /*
    * 댓글 신고 여부 조회
    * */
    private CommentReport findCommentReport (Long commentId, Long userId) {
        return commentReportRepository.findByComment_CommentIdAndUser_UserId(commentId, userId);
    }

    /*
    * 댓글 신고 중복여부 검증
    * */
    private void verifiedReportComment(Long commentId, Long userId) {
        Optional<CommentReport> optionalCommentReport = Optional.ofNullable(findCommentReport(commentId, userId));
        if(optionalCommentReport.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EXIST_COMMENT_REPORT);
        }
    }




}
