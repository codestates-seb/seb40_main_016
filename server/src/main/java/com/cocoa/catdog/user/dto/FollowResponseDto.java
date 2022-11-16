package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FollowResponseDto {
    private long followId;

    @JsonIgnore
    private User followingUser;
    @JsonIgnore
    private User followedUser;
    public long getFollowerId() { return followingUser.getUserId();}
    public long getFollowedId() { return followedUser.getUserId();}

}
