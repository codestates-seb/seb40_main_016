package com.cocoa.catdog.user.service;

import com.cocoa.catdog.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public User findUser(long userId) {
        return User.builder().userId(userId)
                .email("user@user.com")
                .password("password")
                .userName("sanguk")
                .build();
    }
}
