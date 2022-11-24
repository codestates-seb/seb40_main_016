package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class UserProfileResponseDto {
    private Long userId;
    private String userName;
    private String content;
    private String userImg;
    private User.UserStatus userStatus;
    private String userType;
    private String userGender;
    private LocalDate userBirth;
    private LocalDateTime createdAt;
    private Long followerCnt;


}
