package com.cocoa.catdog.article.controller;


import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleMapper mapper;
//    private final JwtTokeninzer jwtTokeninzer;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ArticleDto.Response postArticle(@Valid @RequestBody ArticleDto.Post postDto) {
        Article article = mapper.postDtoToEntity(postDto);
        return mapper.entityToResponseDto(articleService.saveArticle(article, 1L));
    }

    @PatchMapping("/{article-id}")
    @ResponseStatus(HttpStatus.OK)
    ArticleDto.Response patchArticle(@PathVariable("article-id") Long articleId,
                                     )


}
