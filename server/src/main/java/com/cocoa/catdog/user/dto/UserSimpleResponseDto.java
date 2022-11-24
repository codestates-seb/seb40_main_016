package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserSimpleResponseDto {
    private Long userId;
    private String userName;
    private String userImg;
    private User.UserStatus userStatus;
}
