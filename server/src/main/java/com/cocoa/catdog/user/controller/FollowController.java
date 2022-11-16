package com.cocoa.catdog.user.controller;

import com.cocoa.catdog.response.MultiResponseDto;
import com.cocoa.catdog.response.SingleResponseDto;
import com.cocoa.catdog.user.dto.UserPatchDto;
import com.cocoa.catdog.user.dto.UserPostDto;
import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.mapper.FollowMapper;
import com.cocoa.catdog.user.mapper.UserMapper;
import com.cocoa.catdog.user.service.FollowService;
import com.cocoa.catdog.user.service.UserService;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/follow")
@Validated
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final FollowMapper mapper;

    //팔로우
    @PostMapping("/{follower-id}/{followed-id}")
    public ResponseEntity postUser(@PathVariable("follower-id") long followerId, @PathVariable("followed-id") long followedId) {
        Follow response = followService.createFollow(followerId, followedId);

        return new ResponseEntity<>(mapper.followToFollowResponseDto(response), HttpStatus.CREATED);
    }
/*

    //팔로우 취소
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //특정 유저의 팔로우 목록 조회
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(user)), HttpStatus.OK);
    }

    //팔로우 정보 수정
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") long userId, @Valid @RequestBody UserPatchDto userPatchDto) {
        userPatchDto.setUserId(userId);
        User user = mapper.userPatchDtoToUser(userPatchDto);
        User response = userService.updateUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(response)), HttpStatus.OK);
    }

    //전체회원 조회
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<User> pageUsers = userService.findUsers(page-1, size);
        List<User> users = pageUsers.getContent();
        //서비스 구현
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserResponseDto(users), pageUsers), HttpStatus.OK);

    }
*/


}