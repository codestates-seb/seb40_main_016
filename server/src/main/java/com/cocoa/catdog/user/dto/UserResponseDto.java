package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.cocoa.catdog.user.entity.User;

import java.time.LocalDateTime;

@Builder
@Getter
public class UserResponseDto {
    private long userId;
    private String email;
    private String userName;
    private String content;
    private String userImg;
    private User.UserStatus userStatus;
    private Wallet wallet;

    private String userType;
    private String userGender;
    private String userBirth;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

/*
    유저가 가진 yummy를 지갑에서 가져와 표시
    public int getYummy() { return wallet.getYummy();}
*/
}
