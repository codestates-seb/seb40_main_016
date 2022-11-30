package com.cocoa.catdog.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserPatchDto {

    private long userId;

    private String userName;
    private String password;

    private String content;
    private String userType;
    private String userGender;

    private LocalDate userBirth;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private Boolean needSocialSet;
    private String userStatus;

    public void setUserId(long userId){
        this.userId = userId;
    }
}