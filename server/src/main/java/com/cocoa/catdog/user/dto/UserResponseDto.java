package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.cocoa.catdog.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    private LocalDate userBirth;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @JsonIgnore
    private List<Follow> followingUsers;
    public int getFollowCnt() { return followingUsers.size();}
    @JsonIgnore
    private List<Follow> followedUsers;
    public int getFollowerCnt() { return followedUsers.size();}

/*
    유저가 가진 yummy를 지갑에서 가져와 표시
    public int getYummy() { return wallet.getYummy();}
*/
}
