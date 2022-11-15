package com.cocoa.catdog.article.controller;


import com.cocoa.catdog.article.Dto.ArticleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("articles")
@RequiredArgsConstructor
public class ArticleController {

    private final AritcleService articleService;
    private final ArticleMapper mapper;
    private final JwtTokeninzer jwtTokeninzer;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ArticleDto.Response
}
