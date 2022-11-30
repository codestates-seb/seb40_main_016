package com.cocoa.catdog.user.service;

import com.cocoa.catdog.config.aws.S3Service;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cocoa.catdog.auth.CustomAuthorityUtils;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final S3Service s3Service;
    @Value("${s3.userDir}")
    private String userDir;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, S3Service s3Service) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.s3Service = s3Service;
    }

    //일반 회원 가입
    public User createUser(User user, MultipartFile file) {
        verifyExistsEmail(user.getEmail());
        //패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        user.setWallet(new Wallet());
        user.setNeedSocialSet(false);

        if (file != null) {
            String url = s3Service.uploadFile(userDir, file);
            user.setUserImg(url);
        }

        //db에 유저 역할 정보 저장
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    //소셜 로그인 회원 가입
    public User oauthCreateUser(User user) {

        if(verifyExistsEmail(user.getEmail())) {
            log.info("이미 가입된 유저입니다.");
            return user;
        }
        else {
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
            user.setWallet(new Wallet());
            //db에 유저 역할 정보 저장
            List<String> roles = authorityUtils.createRoles(user.getEmail());
            user.setRoles(roles);
            user.setNeedSocialSet(true);
            return userRepository.save(user);
        }
    }


    public boolean passwordCheck(long userId, String password) {
        User findUser = userRepository.findByUserId(userId);
        if (passwordEncoder.matches(password, findUser.getPassword())) {
            return true;
        } else { return false; }
    }
    //유저 정보 수정 (이메일은 고유값으로 변경 불가, 비밀번호, 이름, 소개 변경 가능) todo 필수 아닌 추가 정보 수정 가능하도록
    public User updateUser(User user, MultipartFile file) {
        User findUser = findVerifiedUser(user.getUserId());


        if (file != null) {
            if (findUser.getUserImg() != null) {
                String originalFileName = findUser.getUserImg().split("amazonaws.com/")[1];
                s3Service.removeS3File(originalFileName);
            }
            String imgUrl = s3Service.uploadFile(userDir, file);
            findUser.setUserImg(imgUrl);
        }
        Optional.ofNullable(user.getUserName())
                .ifPresent(userName -> findUser.setUserName(userName));
        Optional.ofNullable(user.getContent())
                .ifPresent(content -> findUser.setContent(content));
        Optional.ofNullable(user.getUserGender())
                .ifPresent(userGender -> findUser.setUserGender(userGender));
        Optional.ofNullable(user.getUserBirth())
                .ifPresent(userBirth -> findUser.setUserBirth(userBirth));
//        Optional.ofNullable(user.getUserImg())
//                .ifPresent(imgUrl -> findUser.setUserImg(imgUrl));
        Optional.ofNullable(user.getUserType())
                .ifPresent(userType -> findUser.setUserType(userType));
        Optional.ofNullable(user.getUserStatus())
                .ifPresent(userStatus -> findUser.setUserStatus(userStatus));
        Optional.ofNullable(user.getNeedSocialSet())
                .ifPresent(needSocialSet -> findUser.setNeedSocialSet(needSocialSet));

        return userRepository.save(findUser);
    }

    //유저 id로 찾기
    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    //유저 이름으로 찾기
    public User findUserName(String username) {
        return userRepository.findByUserName(username);
    }

    //유저 email로 찾기
    public User findUserByEmail(String email) {
        return findVerifiedUserByEmail(email);
    }

    //전체 유저 조회
    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("userId").descending()));
    }

    //생일 유저 조회
    public Page<User> findBirthUsers(int page, int size) {
        LocalDate today = LocalDate.now();
        return userRepository.findByUserBirthIs(PageRequest.of(page, size, Sort.by("userId").descending()), today);

    }

    // 기본 정보 입력이 필요한 유저인지 확인
    public boolean checkNeedSocialSet(String email) {
        Optional<User> findUser = userRepository.findByEmail(email);
        return findUser.get().getNeedSocialSet();
    }

    //유저 삭제
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);
        userRepository.delete(findUser);
    }

    // 유저 있는지 확인 by Id
    private User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        //유저정보가 없으면 예외 발생
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;

    }

    //유저 있는지 확인 by Email
    private User findVerifiedUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        //유저정보가 없으면 예외 발생
        return optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public boolean verifyExistsEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}

