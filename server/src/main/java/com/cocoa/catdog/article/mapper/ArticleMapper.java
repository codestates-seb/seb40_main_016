package com.cocoa.catdog.article.mapper;

import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.entity.Article;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    Article postDtoToEntity(ArticleDto.Post postDto);

    Article patchDtoToEntity(ArticleDto.Patch patchDto);

    ArticleDto.Response entityToResponseDto(Article article);

    List<ArticleDto.Response> entityListToResponseDtoList(List<Article> articles);
}
