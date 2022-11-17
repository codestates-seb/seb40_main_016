package com.appstew.practiceMain.comment;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentReport;
import com.cocoa.catdog.comment.repository.CommentRepository;
import com.cocoa.catdog.comment.service.CommentService;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
public class CommentServiceUnitTest {
    @Mock
    private CommentRepository commentRepository;
    @Mock
    private UserService userService;
    @Mock
    private ArticleService articleService;
    @InjectMocks
    private CommentService commentService;
    User testUser;
    Article testArticle;
    Comment testComment;
    Long articleId = 1L;
    Long userId = 1L;


    @BeforeEach
    public void beforeEach() {
        testUser = new User();
        testUser.setUserId(1L); testUser.setEmail("test@gmail.com");
        testUser.setPassword("password"); testUser.setUserName("test_name");
        testArticle = Article.builder().articleId(1L).articleImg("testurl")
                .content("글 내용").comments(new ArrayList<>()).build();
        Comment comment = Comment.builder().commentId(1L).content("댓글내용").build();

        given(userService.findUser(Mockito.anyLong())).willReturn(testUser);
        given(articleService.findArticle(Mockito.anyLong())).willReturn(testArticle);
        given(commentRepository.save(Mockito.any())).willReturn(comment);

        testComment = commentService.createComment(comment, articleId, userId);
    }

    @Test
    @DisplayName("댓글 등록 테스트")
    public void createComment() {
        //given --> beforeEach()
        //when --> beforeEach()
        //then
        assertThat(testComment.getUser().getUserId()).isEqualTo(1L);
        assertThat(testComment.getArticle().getArticleId()).isEqualTo(1L);
        assertThat(testComment.getCommentId()).isEqualTo(1L);
        assertThat(testUser.getComments().get(0).getCommentId()).isEqualTo(1L);
        assertThat(testArticle.getComments().get(0).getCommentId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("댓글 수정 테스트")
    public void updateComment() {
        //given
        Comment requestComment = Comment.builder().content("수정된 댓글내용").build();
        Long reqCommentId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testComment));

        //when
        Comment updatedComment = commentService.updateComment(requestComment, reqCommentId);

        //then
        assertThat(updatedComment.getContent()).isEqualTo("수정된 댓글내용");


    }

    @Test
    @DisplayName("댓글 삭제 테스트")
    public void deleteComment() {
        //given
        Long commentId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testComment));
        doNothing().when(commentRepository).delete(Mockito.any());

        //when
        commentService.deleteComment(commentId);

        //then
        assertThat(testUser.getComments().contains(testComment)).isFalse();
        assertThat(testArticle.getComments().contains(testComment)).isFalse();

    }

    @Test
    @DisplayName("댓글 조회 테스트 - 성공")
    public void findComment() {
        //given
        Long commentId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testComment));

        //when
        Comment findComment = commentService.findComment(commentId);

        //then
        assertThat(findComment.getCommentId()).isEqualTo(testComment.getCommentId());
    }

    @Test
    @DisplayName("댓글 조회 테스트 - 실패")
    public void findCommentFail() {
        //given
        Long commentId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.empty());

        //when, then
        assertThrows(BusinessLogicException.class, () -> commentService.findComment(commentId));
    }
    @Test
    @DisplayName("댓글리스트 조회 테스트")
    public void findComments() {
        //given
        List<Comment> comments = new ArrayList<>();
        comments.add(testComment);
        Page<Comment> page = new PageImpl<>(comments);

        given(commentRepository.findAll((Pageable) Mockito.any())).willReturn(page);

        //when
        Page<Comment> pageComment = commentService.findComments(1, 1);

        //then
        assertThat(pageComment.getContent().get(0).getCommentId()).isEqualTo(testComment.getCommentId());
    }

    @Test
    @DisplayName("댓글 좋아요 테스트")
    public void likeComment() {
        //given
        Long commentId = 1L;
        Long userId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testComment));

        //when
        commentService.likeComment(commentId, userId);

        //then
        assertThat(testComment.getCommentLikes().get(0).getUser().getUserId()).isEqualTo(userId);
        assertThat(testComment.getLikeCnt()).isEqualTo(1);
    }

    @Test
    @DisplayName("댓글 신고 테스트")
    public void reportComment() {
        //given
        Long commentId = 1L;
        Long userId = 1L;

        given(commentRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(testComment));
        CommentReport commentReport = new CommentReport();
        commentReport.addContent("신고 내용");

        //when
        commentService.reportComment(commentReport, commentId, userId);

        //then
        assertThat(testComment.getCommentReports().get(0).getUser().getUserId()).isEqualTo(userId);
        assertThat(testComment.getCommentReports().get(0).getContent()).isEqualTo("신고 내용");
    }
}
