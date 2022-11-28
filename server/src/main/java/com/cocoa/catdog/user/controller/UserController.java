package com.cocoa.catdog.user.controller;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.comment.service.CommentService;
import com.cocoa.catdog.response.MultiResponseDto;
import com.cocoa.catdog.response.SingleResponseDto;
import com.cocoa.catdog.user.dto.UserPatchDto;
import com.cocoa.catdog.user.dto.UserPostDto;
import com.cocoa.catdog.user.dto.UserResponseDto;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.mapper.UserMapper;
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
@RequestMapping
@Validated
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private final JwtTokenizer jwtTokenizer;
    private final ArticleService articleService;
    private final CommentService commentService;
    private final ArticleMapper articleMapper;

    //회원가입
    @PostMapping("/user")
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto) {
        User user = mapper.userPostDtoToUser(userPostDto);
        User response = userService.createUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(response)), HttpStatus.CREATED);
    }
    //회원정보 수정
    @PatchMapping("/user/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") long userId, @Valid @RequestBody UserPatchDto userPatchDto) {
        userPatchDto.setUserId(userId);
        User user = mapper.userPatchDtoToUser(userPatchDto);
        User response = userService.updateUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(response)), HttpStatus.OK);
    }
    //전체회원 조회
    @GetMapping("/user")
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<User> pageUsers = userService.findUsers(page-1, size);
        List<User> users = pageUsers.getContent();
        //서비스 구현
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserResponseDto(users), pageUsers), HttpStatus.OK);

    }
    //특정회원 조회
    @GetMapping("/user/profile/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserProfileResponseDto(user)), HttpStatus.OK);
    }

    //회원 삭제
    @DeleteMapping("/user/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //마이페이지에서 정보 조회
    @GetMapping("/user/my-page")
    @ResponseStatus(HttpStatus.OK)
    public UserResponseDto getProfile(@RequestHeader(name = "Authorization") String token) {
        return mapper.userToUserResponseDto(userService.findUser(jwtTokenizer.getUserId(token)));
    }

    //전체회원 조회
    @GetMapping("/user/birth")
    public ResponseEntity getBirthUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<User> pageUsers = userService.findUsers(page-1, size);
        List<User> users = pageUsers.getContent();
        //서비스 구현
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserBirthDto(users), pageUsers), HttpStatus.OK);

    }
}