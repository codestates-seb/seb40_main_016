package com.cocoa.catdog.user.dto;

import com.cocoa.catdog.article.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class UserImgDto {

    private String imgUrl;
}
