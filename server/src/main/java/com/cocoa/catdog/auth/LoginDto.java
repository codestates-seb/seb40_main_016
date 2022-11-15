package com.cocoa.catdog.auth;

import lombok.Getter;

@Getter
public class LoginDto {
    private String email; // == 유저email
    private String password;
}

