package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    @JsonIgnore
    private List<Follow> followingUsers;
    public int getFollowCnt() { return followingUsers.size();}
    @JsonIgnore
    private List<Follow> followedUsers;
    public int getFollowerCnt() { return followedUsers.size();}


}
