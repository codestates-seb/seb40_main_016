package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class UserBirthDto {
    private long userId;
    private String userName;
    private String content;
    private String userImg;

    private String userType;
    private String userGender;
    private LocalDate userBirth;

    @JsonIgnore
    private Wallet wallet;
    public long getWalletId() {return wallet.getWalletId();}
}
