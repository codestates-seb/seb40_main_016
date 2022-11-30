package com.cocoa.catdog.user.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.comment.entity.CommentLike;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
// @AllArgsConstructor
@Table(name = "USERS")
public class User extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

    //@Column(nullable = false, length = 100)
    @Column(length = 100)
    private String userName;


    // todo 유저 기본 이미지 url 추가 필요-s3 업로드
    private String userImg;

    private String userGender;

    @Column(length = 200)
    private String content;

    private LocalDate userBirth;

    @Enumerated(value = EnumType.STRING)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    @Getter
    @ColumnDefault("false")
    private Boolean needSocialSet;

    @Enumerated(value = EnumType.STRING)
    private UserType userType;

    // 유저 권한 관리를 위한 필드 추가
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Wallet wallet;

    @OneToMany(mappedBy = "user")
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "followingUser")
    private List<Follow> followingUsers = new ArrayList<>();

    @OneToMany(mappedBy = "followedUser")
    private List<Follow> followedUsers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Report> reports = new ArrayList<>();

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
        if (wallet.getUser() != this) {
            wallet.setUser(this);
        }
    }

    public void addArticle(Article article) {
        if(!articles.contains(article)) {
            articles.add(article);
            article.addUser(this);
        }
    }

    public void addLike(Like like) {
        if(!likes.contains(like)) {
            likes.add(like);
            like.addUser(this);
        }
    }

    public void addReport(Report report) {
        if(!reports.contains(report)) {
            reports.add(report);
            report.addUser(this);
        }
    }

    public void addComment(Comment comment) {
        if(!comments.contains(comment)) {
            comments.add(comment);
            comment.addUser(this);
        }
    }

    public void removeComment (Comment comment) {
        comments.remove(comment);
    }

    public void removeArticle (Article article) {
        articles.remove(article);
    }

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_SLEEP("휴면 상태"),
        USER_DROPPED("탈퇴");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }
    public enum UserType {
        PERSON("사람"),
        CAT("고양이"),
        DOG("강아지");

        @Getter
        private String type;

        UserType(String type) {
            this.type = type;
        }
    }


    public enum UserGender {
        MALE("수"),
        FEMALE("암");

        @Getter
        private String gender;

        UserGender(String gender) {
            this.gender = gender;
        }
    }

/*    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }*/

    public User(String email, String password, String userName) {
        this.email = email;
        this.password = password;
        this.userName = userName;
    }
}


