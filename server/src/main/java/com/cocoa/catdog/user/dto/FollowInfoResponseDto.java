package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FollowInfoResponseDto {
    @JsonIgnore
    private User followedUser;
    public long getFollowedId() { return followedUser.getUserId();}
    public String getFollowedName() { return followedUser.getUserName();}
    public String getFollowedImg() { return followedUser.getUserImg();}
}
