package com.cocoa.catdog.wallet.mapper;

import com.cocoa.catdog.wallet.dto.GiveTakeDto;
import com.cocoa.catdog.wallet.dto.GiveTakeResponseDto;
import com.cocoa.catdog.wallet.entity.GiveTake;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GiveTakeMapper {
    GiveTake PostToGiveTake(GiveTakeDto.Post post);


    default GiveTakeResponseDto.Normal giveTakeToNormalResponse(GiveTake giveTake) {
        return GiveTakeResponseDto.Normal.builder()
                .giveTakeId(giveTake.getGiveTakeId())
                .giveYummy(giveTake.getGiveYummy())
                .giveUserId(giveTake.getGiveWlt().getUser().getUserId())
                .takeUserId(giveTake.getTakeWlt().getUser().getUserId())
                .articleId(giveTake.getArticle().getArticleId())
                .build();
    }


}
