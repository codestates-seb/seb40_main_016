package com.cocoa.catdog.user.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.usertype.UserType;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @ColumnDefault("url")
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

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_SLEEP("휴면 상태"),
        USER_DROPPED("탈퇴");

        @Enumerated(value = EnumType.STRING)
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

}


