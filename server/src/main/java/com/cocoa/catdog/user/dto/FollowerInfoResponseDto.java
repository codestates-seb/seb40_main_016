package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FollowerInfoResponseDto {

    @JsonIgnore
    private User followingUser;
    public long getFollowingId() { return followingUser.getUserId();}
    public String getFollowingName() { return followingUser.getUserName();}
    public String getFollowingImg() { return followingUser.getUserImg();}
}
