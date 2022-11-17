package com.cocoa.catdog.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserPatchDto {

    private long userId;

    private String userName;

    private String content;
    private String userType;
    private String userGender;
    private String userImg;
    private String userBirth;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setUserId(long userId){
        this.userId = userId;
    }
}