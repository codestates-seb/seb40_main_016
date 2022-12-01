package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class FollowResponseDto {
    private long followId;

    @JsonIgnore
    private User followingUser;
    public long getFollowerId() { return followingUser.getUserId();}
    @JsonIgnore
    private User followedUser;
    public long getFollowedId() { return followedUser.getUserId();}

}
