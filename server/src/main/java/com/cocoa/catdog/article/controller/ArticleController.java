package com.cocoa.catdog.article.controller;


import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.article.mapper.ArticleMapper;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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
                                    @RequestPart(required = false, value = "file") List<MultipartFile> files
    ) throws Exception {
        Article article = mapper.postDtoToEntity(postDto);


        return mapper.entityToResponseDto(
                articleService.saveArticle(article, jwtTokenizer.getUserId(token), files));
    }

    //테스트
    @PostMapping("/test")
    @ResponseStatus(HttpStatus.CREATED)
    ArticleDto.Response postArticleTest(@RequestHeader(name = "Authorization") String token,
                                    @Valid @RequestBody ArticleDto.Post postDto) {
        Article article = mapper.postDtoToEntity(postDto);

        return mapper.entityToResponseDto(
                articleService.saveArticleTest(article, jwtTokenizer.getUserId(token)));
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

        return new MultiResponseDto<>(articleResponseDtos, pageArticles);
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

    //마이페이지에서 게시물 조회
    @GetMapping("/my-page")
    public ResponseEntity getMyArticles(@RequestHeader(name = "Authorization") String token,
                                        @RequestParam(required = false, defaultValue = "post") String tab,
                                        @RequestParam(required = false, defaultValue = "1") int page) {
        Page<Article> pageArticles = articleService.findProfileArticles(page - 1, 24, tab, jwtTokenizer.getUserId(token));
        List<Article> articles = pageArticles.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.entityToProfileResponseDtoList(articles), pageArticles), HttpStatus.OK);

    }

    //프로필에서 게시물 조회
    @GetMapping("/profile/{user-id}")
    public ResponseEntity getArticlesOfUser(@RequestParam(required = false, defaultValue = "post") String tab,
                                            @RequestParam(required = false, defaultValue = "1") int page,
                                            @PathVariable("user-id") Long userId) {
        if(tab.equals("give")) {
            throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
        }
        Page<Article> pageArticles = articleService.findProfileArticles(page - 1, 24, tab, userId);
        List<Article> articles = pageArticles.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.entityToProfileResponseDtoList(articles), pageArticles), HttpStatus.OK);

    }





    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    MultiResponseDto<ArticleDto.Response>
    searchArticles(@RequestParam(name = "q") String keyword,
                   @RequestParam(required = false) String option,
                   @RequestParam(required = false, defaultValue = "1") Integer page) {
            Page<Article> pageArticles = articleService.searchArticles(keyword, page - 1, 24);
              List<Article> articles = pageArticles.getContent();
            List<ArticleDto.Response> responseDtos =
                    mapper.entityListToResponseDtoList(articles
                            .stream().collect(Collectors.toList()));
            return new MultiResponseDto<>(responseDtos, pageArticles);

    }
}
