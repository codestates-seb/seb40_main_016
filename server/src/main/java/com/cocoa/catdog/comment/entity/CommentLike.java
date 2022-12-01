package com.cocoa.catdog.comment.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor // 빈 생성자 생성 후 add 메서드로 초기화해야만 생성가능하도록 설정
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    //==연관관계 메서드==//
    public void addUser(User user) {
        if (this.user == null) {
            this.user = user;
        }
    }

    public void addComment(Comment comment) {
        if (this.comment == null) {
            this.comment = comment;
            comment.addCommentLike(this);
        }
    }
}
