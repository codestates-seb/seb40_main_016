package com.cocoa.catdog.user.entity;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String userName;

    // todo 유저 기본 이미지 url 추가 필요-s3 업로드
    private String userImg;

    private String userGender;

    private LocalDate userBirth;

    @Column(length = 200)
    private String content;
    // 자기소개 정보

    @Getter
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

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

    public void addWallet(Wallet wallet) {
        this.wallet = wallet;
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

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

}


