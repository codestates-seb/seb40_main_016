package com.cocoa.catdog.article.mapper;

import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.Dto.ArticleImgDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImg;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    Article postDtoToEntity(ArticleDto.Post postDto);

    Article patchDtoToEntity(ArticleDto.Patch patchDto);

    default ArticleDto.Response entityToResponseDto(Article article) {
        return ArticleDto.Response.builder()
                .articleId(article.getArticleId())
                .content(article.getContent())
                .likeCnt(article.getLikeCnt())
                .views(article.getViews())
                .reportCnt(article.getReportCnt())
                .YummyCnt(article.getYummyCnt())
                .createdAt(article.getCreatedAt())
                .articleStatus(article.getArticleStatus())
                .articleImg(
                        ArticleImgDto.Response.builder()
                                .images(article.getArticleImg())
                                .build()
                )
                .user(
                        UserSimpleResponseDto.builder()
                                .userId(article.getUser().getUserId())
                                .userImg(article.getUser().getUserImg())
                                .userName(article.getUser().getUserName())
                                .userStatus(article.getUser().getUserStatus())
                                .build()
                ).build();
    }

    List<ArticleDto.Response> entityListToResponseDtoList(List<Article> articles);

    default ArticleDto.ProfileResponse entityToProfileResponseDto(Article article) {
        return ArticleDto.ProfileResponse.builder()
                .articleId(article.getArticleId())
                .articleImg(
                        ArticleImgDto.Response.builder()
                                .images(article.getArticleImg())
                                .build()
                )
                .content(article.getContent())
                .likeCnt(article.getLikeCnt())
                .views(article.getViews())
                .reportCnt(article.getReportCnt())
                .YummyCnt(article.getYummyCnt())
                .createdAt(article.getCreatedAt())
                .articleStatus(article.getArticleStatus())
                .build();
    }

    List<ArticleDto.ProfileResponse> entityToProfileResponseDtoList(List<Article> articles);
    default ArticleDto.ProfileOnGiveResponse entityToProfileOnGiveResponseDto(Article article, Integer giveYummy) {
        return ArticleDto.ProfileOnGiveResponse.builder()
                .articleId(article.getArticleId())
                .articleImg(
                        ArticleImgDto.Response.builder()
                                .images(article.getArticleImg())
                                .build()
                )
                .content(article.getContent())
                .likeCnt(article.getLikeCnt())
                .views(article.getViews())
                .reportCnt(article.getReportCnt())
                .YummyCnt(article.getYummyCnt())
                .giveYummyCnt(giveYummy)
                .createdAt(article.getCreatedAt())
                .articleStatus(article.getArticleStatus())
                .build();
    }
    default List<ArticleDto.ProfileOnGiveResponse> entityToProfileOnGiveResponseDtoList(List<Article> articles, List<Integer> giveYummys) {
        List<ArticleDto.ProfileOnGiveResponse> dtoList = new ArrayList<>();
        for (int i = 0; i < articles.size(); i++) {
            dtoList.add(entityToProfileOnGiveResponseDto(articles.get(i), giveYummys.get(i)));
        }
        return dtoList;
    }

    Report reportToReportDto(ArticleDto.Report report);
}
