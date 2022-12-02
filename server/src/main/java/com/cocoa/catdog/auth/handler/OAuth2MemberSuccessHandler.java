package com.cocoa.catdog.auth.handler;

import com.cocoa.catdog.auth.CustomAuthorityUtils;
import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;


    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      CustomAuthorityUtils authorityUtils,
                                      UserService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        log.info("구글 로그인 완료");

        // 이메일로 가입된 유저인지 확인
        if (userService.verifyExistsEmail(email)) {
            log.info("이미 가입된 유저입니다.");

            String returnUri = "https://givemesnack.me/google-login";

            if (userService.checkNeedSocialSet(email)) {
                log.info("기본 정보 설정이 필요합니다.");
                // 이메일로 유저 찾기
                User findUser = userService.findUserByEmail(email);
                // 토큰 생성
                String accessToken = delegateAccessToken(findUser);
                // 리다이렉션 주소 생성, 토큰과 가입 여부, 기본 정보 입력 여부를 파라미터로 전달
                String targetUrl = UriComponentsBuilder.fromUriString(returnUri)
                        .queryParam("accessToken", accessToken)
                        .queryParam("sign", 1)
                        .queryParam("info", 0)
                        .build().toUriString();
                // 토큰을 파라미터로 전달
                getRedirectStrategy().sendRedirect(request, response, targetUrl);
            } else {        // 가입되어 있고 기본 정보 설정이 필요하지 않은 경우
                log.info("정상 유저 로그인을 진행합니다.");
                // 이메일로 유저 찾기
                User findUser = userService.findUserByEmail(email);
                // 토큰 생성
                String accessToken = delegateAccessToken(findUser);
                // 리다이렉션 주소 생성
                String targetUrl = UriComponentsBuilder.fromUriString(returnUri)
                        .queryParam("accessToken", accessToken)
                        .queryParam("sign", 1)
                        .queryParam("info", 1)
                        .build().toUriString();
                // 토큰을 파라미터로 전달
                getRedirectStrategy().sendRedirect(request, response, targetUrl);

            }
        }
        // 소셜로 신규 가입 하는 경우
        else {
            log.info("소셜 이메일로 신규 가입합니다..");
            // 신규 유저 정보 저정
            User savedUser = saveMember(email);

            // 토큰 생성
            String accessToken = delegateAccessToken(savedUser);
            // 리다이렉션 주소 생성
            String returnUri = "https://givemesnack.me/google-login";
            String targetUrl = UriComponentsBuilder.fromUriString(returnUri)
                    .queryParam("accessToken", accessToken)
                    .queryParam("sign", 0)
                    .queryParam("info", 0)
                    .build().toUriString();

            // 토큰을 파라미터로 전달
            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        }
    }


    // 유저 정보로 토큰 생성 후 리스폰스용 헤더에 입력
    private HttpServletResponse setTokenToHeader(HttpServletResponse response, User user) {
        // 토큰 생성
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user.getEmail());

        // 토큰 헤더에 입력
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        return response;
    }


    // 신규 소셜 유저 저장 (기본 유저이름 google, 패스워드 1111)
    private User saveMember(String email) {
        List<String> authorities = List.of("USER");
        User user = new User(email, "1111", "google");
        user.setRoles(authorities);
        return userService.oauthCreateUser(user);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles());
        claims.put("userName", user.getUserName());
        claims.put("userId", user.getUserId());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80)
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}