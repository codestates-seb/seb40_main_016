package com.cocoa.catdog.article.controller;


import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    /*
    * 게시물 등록
    * */
    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    ArticleDto.Response postArticle(@RequestHeader(name = "Authorization") String token,
                                    @Valid @RequestPart(value = "postDto") ArticleDto.Post postDto,
                                    @RequestPart(value = "file") List<MultipartFile> files
    ) throws Exception {
        Article article = mapper.postDtoToEntity(postDto);


        return mapper.entityToResponseDto(
                articleService.saveArticle(article, jwtTokenizer.getUserId(token), files));
    }

    /*
    * 게시물 수정
    * */
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

    /*
    * 게시물 조회
    * */
    @GetMapping("/{article-id}")
    @ResponseStatus(HttpStatus.OK)
    ArticleDto.Response getArticle(@PathVariable("article-id") Long articleId,
                                   @RequestHeader(name = "Authorization", required = false, defaultValue = "null") String token) {
        long userId = token.equals("null") ? 0 : jwtTokenizer.getUserId(token);
        Article foundArticle = articleService.findArticle(articleId);
        ArticleDto.Response response = mapper.entityToResponseDto(foundArticle);
        response.addGotLiked(articleService.checkLikeArticle(articleId, userId));

        return response;
    }

    /*
    * 게시물 목록 조회
    * */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    MultiResponseDto<ArticleDto.Response> getArticles(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                                      @RequestParam(required = false, defaultValue = "all") String sort,
                                                      @RequestParam(required = false, defaultValue = "latest") String order,
                                                      @RequestHeader(name = "Authorization", required = false, defaultValue = "null") String token) {
        long userId = token.equals("null") ? 0 : jwtTokenizer.getUserId(token);
        Page<Article> pageArticles = articleService.findArticles(page - 1, 24, sort, order, userId);
        List<Article> articles = pageArticles.getContent();

        List<ArticleDto.Response> articleResponseDtos = mapper.entityListToResponseDtoList(articles)
                .stream()
                .map(dto -> {
                    dto.addGotLiked(articleService.checkLikeArticle(dto.getArticleId(), userId));
                    return dto;
                })
                .collect(Collectors.toList());

        return MultiResponseDto.of(articleResponseDtos, pageArticles);
    }

    /*
    * 게시물 삭제
    * */
    @DeleteMapping("/{article-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteArticle(@PathVariable(name = "article-id") Long articleId,
                       @RequestHeader(name = "Authorization") String token) {
        articleService.deleteArticle(articleId, jwtTokenizer.getUserId(token));
    }

    /*
     * 게시물 좋아요
     * */
    @PostMapping("/{article-id}/likes")
    public ResponseEntity<HttpStatus> likeArticle (@PathVariable("article-id") Long articleId,
                                       @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        articleService.likeArticle(articleId, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    * 게시물 좋아요 취소
    * */
    @DeleteMapping("/{article-id}/likes")
    public ResponseEntity<HttpStatus> cancelLikeArticle (@PathVariable("article-id") Long articleId,
                                                         @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        articleService.deleteLikeArticle(articleId, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    * 게시물 신고
    * */
    @PostMapping("/{article-id}/report")
    public ResponseEntity<HttpStatus> reportArticle(@PathVariable("article-id") Long articleId,
                                                    @RequestBody @Valid ArticleDto.Report reportDto,
                                                    @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        Report report = mapper.reportToReportDto(reportDto);
        articleService.reportArticle(report, articleId, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }





}
