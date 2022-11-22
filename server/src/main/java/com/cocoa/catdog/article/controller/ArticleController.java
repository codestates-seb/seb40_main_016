package com.cocoa.catdog.article.controller;


import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.config.aws.S3Uploader;
import com.cocoa.catdog.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.File;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    private final S3Uploader s3Uploader;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ArticleDto.Response postArticle(@RequestHeader(name = "Authorization") String token,
            @Valid @RequestPart(value = "postDto") ArticleDto.Post postDto,
                                    @RequestPart(value = "file") List<MultipartFile> files
                                    ) throws Exception {
        Article article = mapper.postDtoToEntity(postDto);


        return mapper.entityToResponseDto(
                articleService.saveArticle(article, jwtTokenizer.getUserId(token), images));
    }

    @PatchMapping("/{article-id}")
    @ResponseStatus(HttpStatus.OK)
    ArticleDto.Response patchArticle(@PathVariable("article-id") Long articleId,
                                     @RequestHeader(name = "Authorization") String token,
                                     @RequestBody ArticleDto.Patch patchDto) {
        patchDto.setArticleId(articleId);
        Article article = mapper.patchDtoToEntity(patchDto);

        return mapper.entityToResponseDto(
                articleService.updateArticle(article, jwtTokenizer.getUserId(token)));
    }

    @GetMapping("/{article-id}")
    @ResponseStatus(HttpStatus.OK)
    ArticleDto.Response getArticle(@PathVariable("article-id") Long articleId,
                                   @RequestHeader(name = "Authorization", required = false) String token) {
        Article foundArticle = articleService.findArticle(articleId);
        return mapper.entityToResponseDto(foundArticle);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    MultiResponseDto<ArticleDto.Response> getArticles(@Positive @RequestParam int page,
                                                     @Positive @RequestParam int size) {
        Page<Article> pageArticles = articleService.findArticles(page -1, size);
        List<Article> articles = pageArticles.getContent();

        return MultiResponseDto.of(mapper.entityListToResponseDtoList(articles), pageArticles);
    }

    @DeleteMapping("/{article-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteArticle(@PathVariable(name = "article-id") Long articleId,
                       @RequestHeader(name = "Authorization") String token) {
        articleService.deleteArticle(articleId, jwtTokenizer.getUserId(token));
    }





}
