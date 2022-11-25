package com.cocoa.catdog.article.mapper;

import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    Article postDtoToEntity(ArticleDto.Post postDto);

    Article patchDtoToEntity(ArticleDto.Patch patchDto);

    default ArticleDto.Response entityToResponseDto(Article article) {
        return ArticleDto.Response.builder()
                .articleId(article.getArticleId())
                .articleImg(article.getArticleImg())
                .content(article.getContent())
                .likeCnt(article.getLikeCnt())
                .views(article.getViews())
                .reportCnt(article.getReportCnt())
                .YummyCnt(article.getYummyCnt())
                .createdAt(article.getCreatedAt())
                .articleStatus(article.getArticleStatus())
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

    ArticleDto.ProfileResponse entityToProfileResponseDto(Article article);
    List<ArticleDto.ProfileResponse> entityToProfileResponseDtoList(List<Article> articles);

    Report reportToReportDto(ArticleDto.Report report);
}
