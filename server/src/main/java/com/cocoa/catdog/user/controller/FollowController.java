package com.cocoa.catdog.user.controller;

import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.user.mapper.FollowMapper;
import com.cocoa.catdog.user.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@Validated
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final FollowMapper mapper;

    //팔로우
    @PostMapping("/follow/{follower-id}/{followed-id}")
    public ResponseEntity addFollow(@PathVariable("follower-id") long followerId, @PathVariable("followed-id") long followedId) {
        Follow response = followService.createFollow(followerId, followedId);

        return new ResponseEntity<>(mapper.followToFollowResponseDto(response), HttpStatus.CREATED);
    }

    //한 유저가 팔로우하고 있는 유저 목록 조회
    @GetMapping("/follow/{user-id}")
    public ResponseEntity getFollow(@PathVariable("user-id") long userId) {
        List<Follow> response = followService.getFollow(userId);

        return new ResponseEntity<>(mapper.followsToFollowInfoResponseDto(response), HttpStatus.OK);
    }

    //나를 팔로우하고 있는 유저 목록 조회
    @GetMapping("/follower/{user-id}")
    public ResponseEntity getFollower(@PathVariable("user-id") long userId) {
        List<Follow> response = followService.getFollower(userId);

        return new ResponseEntity<>(mapper.followsToFollowerInfoResponseDto(response), HttpStatus.OK);
    }

    //팔로우 취소
    @DeleteMapping("/follow/{user-id}/{unfollow-id}")
    public ResponseEntity unFollow(@PathVariable("user-id") long userId, @PathVariable("unfollow-id") long userId2) {

        followService.unFollow(userId, userId2);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //팔로우 상태 체크
    @GetMapping("/follow/{follower-id}/{followed-id}")
    public ResponseEntity isFollow(@PathVariable("follower-id") long followerId, @PathVariable("followed-id") long followedId) {
        Optional<Follow> response = followService.isFollow(followerId, followedId);
        if (response.isPresent()) {
            return new ResponseEntity<>("ok", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("none", HttpStatus.NO_CONTENT);
        }
    }
}