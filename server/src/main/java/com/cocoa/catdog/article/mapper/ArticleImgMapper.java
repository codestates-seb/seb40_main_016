package com.cocoa.catdog.article.mapper;

import com.cocoa.catdog.article.Dto.ArticleDto;
import com.cocoa.catdog.article.Dto.ArticleImgDto;
import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.entity.ArticleImg;
import com.cocoa.catdog.article.entity.Report;
import com.cocoa.catdog.user.dto.UserSimpleResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleImgMapper {
    ArticleImg postDtoToEntity(ArticleImgDto.Post postDto);

    Article patchDtoToEntity(ArticleDto.Patch patchDto);


}
