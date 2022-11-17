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
        verifyExistsFollow(followerId, followedId);

        Follow follow = Follow.builder()
                .followingUser(userRepository.findByUserId(followerId))
                .followedUser(userRepository.findByUserId(followedId))
                .build();


        return followRepository.save(follow);
    }

    // 내가 팔로우 하고 있는 유저 목록 조회
    public List<Follow> getFollow(long userId) {
        List<Follow> follows = followRepository.findByFollowingUser(userRepository.findById(userId));

        return follows;
    }

    // 나를 팔로우 하고 있는 유저 목록 조회
    public List<Follow> getFollower(long userId) {
        List<Follow> follows = followRepository.findByFollowedUser(userRepository.findById(userId));

        return follows;
    }

    // 팔로우 하는 유저수 조회
    public Long getFollowCnt(long userId) {
        // 내가 팔로우 하는 수
        List<Follow> follows = followRepository.findByFollowingUser(userRepository.findById(userId));
        long followCnt =  follows.stream().count();
     return followCnt;
    }

    //팔로우 취소
    public void unFollow(long userId, long userId2) {

        Follow findFollow = findVerifiedFollow(userId, userId2);
        followRepository.delete(findFollow);
    }

    // 팔로우 찾기
    private Follow findVerifiedFollow(long userId, long userId2) {
        // 팔로우 하고 받는 유저 찾기
        User findUser1 = findUser(userId);
        User findUser2 = findUser(userId2);

        //팔로우가 없으면 예외 발생 시키고 찾은 팔로우 리턴
        Optional <Follow> optionalFollow = followRepository.findByFollowingUserAndFollowedUser(findUser1, findUser2);
        Follow findFollow = optionalFollow.orElseThrow(()-> new BusinessLogicException(ExceptionCode.FOLLOW_EXISTS));
        return findFollow;

    }

    //이미 팔로우 되어 있는지 확인
    private void verifyExistsFollow(long userId, long userId2) {
        // 팔로우 하고 받는 유저 찾기
        User findUser1 = findUser(userId);
        User findUser2 = findUser(userId2);
        //팔로우가 있으면 예외 발생
        Optional <Follow> follow = followRepository.findByFollowingUserAndFollowedUser(findUser1, findUser2);
        if(follow.isPresent())
            throw new BusinessLogicException(ExceptionCode.FOLLOW_EXISTS);
    }

    // 팔로우 내에서 유저 찾기
    private User findUser(long userId) {
        Optional <User> optionalUser=userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(()-> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }
}
