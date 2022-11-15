package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.Getter;
import lombok.Setter;
import com.cocoa.catdog.user.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponseDto {
    private long userId;

    private String email;

    private String userName;
    private String content;

/*    private String userType;
    private String userGender;*/
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Wallet wallet;

    private User.UserStatus userStatus;

    public String getUserStatus() {
        return userStatus.getStatus();
    }
}
