package com.cocoa.catdog.user.service;

import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;



    @Transactional(readOnly = true)
    public User findVerified(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        if (findUser.getUserStatus() == User.UserStatus.USER_SLEEP) {
            throw new BusinessLogicException(ExceptionCode.USER_SLEEP);
        }
        if (findUser.getUserStatus() == User.UserStatus.USER_DROPPED) {
            throw new BusinessLogicException(ExceptionCode.USER_DROPPED);
        }
        return findUser;


    }
}
