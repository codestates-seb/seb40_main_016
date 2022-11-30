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
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;

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
    @PostMapping(value = "/user", consumes = "multipart/form-data")
    public ResponseEntity postUser(@Valid @RequestPart(value = "postDto") UserPostDto userPostDto,
                                   @RequestPart(required = false, value = "file")MultipartFile file) {

        User user = mapper.userPostDtoToUser(userPostDto);
        User response = userService.createUser(user, file);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(response)), HttpStatus.CREATED);
    }

    //소셜 회원 필수 정보 입력
    @PostMapping("/user/setinfo")
    public ResponseEntity checkPassword(@RequestHeader(name = "Authorization") String token, @RequestBody UserPatchDto userPatchDto) {
        userPatchDto.setUserId(jwtTokenizer.getUserId(token));
        userPatchDto.setNeedSocialSet(false);
        User user = mapper.userPatchDtoToUser(userPatchDto);
        User response = userService.updateUser(user, null);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponseDto(response)), HttpStatus.OK);
    }


    //회원정보 수정
    @PatchMapping(value = "/user/{user-id}", consumes = "multipart/form-data")
    public ResponseEntity patchUser(@PathVariable("user-id") long userId,
                                    @Valid @RequestPart(value = "patchDto") UserPatchDto userPatchDto,
                                    @RequestPart(required = false, value = "file") MultipartFile file) {

        userPatchDto.setUserId(userId);
        User user = mapper.userPatchDtoToUser(userPatchDto);
        User response = userService.updateUser(user, file);

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

    //패스워드 확인
    @PostMapping("/user/passcheck")
    public ResponseEntity checkPassword(@RequestHeader(name = "Authorization") String token, @RequestBody Map<String, String> passwordMap) {
        if (userService.passwordCheck(jwtTokenizer.getUserId(token), passwordMap.get("password"))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
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