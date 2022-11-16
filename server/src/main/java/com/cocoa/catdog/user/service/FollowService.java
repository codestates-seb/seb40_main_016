package com.cocoa.catdog.user.service;

import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.repository.FollowRepository;
import com.cocoa.catdog.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    //팔로우
    public Follow createFollow(long followerId, long followedId) {
//        verifyExistsFollow(followerId, followedId);
        //db에 팔로우 내역 저장

        Follow follow = Follow.builder()
                .followingUser(userRepository.findByUserId(followerId))
                .followedUser(userRepository.findByUserId(followedId))
                .build();

        return followRepository.save(follow);
    }

    //유저 정보 수정 (이메일은 고유값으로 변경 불가, 비밀번호, 이름, 소개 변경 가능)
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getUserName())
                .ifPresent(userName -> findUser.setUserName(userName));
        Optional.ofNullable(user.getContent())
                .ifPresent(content -> findUser.setContent(content));
        Optional.ofNullable(user.getUserGender())
                .ifPresent(userGender -> findUser.setUserGender(userGender));
        Optional.ofNullable(user.getUserBirth())
                .ifPresent(userBirth -> findUser.setUserBirth(userBirth));
        Optional.ofNullable(user.getUserImg())
                .ifPresent(userImg -> findUser.setUserImg(userImg));
        Optional.ofNullable(user.getUserType())
                .ifPresent(userType -> findUser.setUserType(userType));
        return userRepository.save(findUser);
    }

    //유저 id로 찾기
    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    //유저 이름으로 찾기
    public User findUserName(String username){
        return userRepository.findByUserName(username);
    }

    //전체 유저 조회
    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page,size, Sort.by("userId").descending()));
    }

    //유저 삭제
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

    // 유저 있는지 확인
    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        //유저정보가 없으면 예외 발생
        User findUser = optionalUser.orElseThrow(()-> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;

    }

    //이미 팔로우 되어 있는지 확인
    private void verifyExistsFollow(long followerId, long followedId) {
        Optional<Follow> follow = followRepository.findByFollowingUser(followedId);
        if(follow.isPresent())
            throw new BusinessLogicException(ExceptionCode.FOLLOW_EXISTS);
    }
}
