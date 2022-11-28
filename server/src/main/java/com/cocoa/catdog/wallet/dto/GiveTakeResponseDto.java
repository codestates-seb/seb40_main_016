package com.cocoa.catdog.wallet.dto;

import lombok.Builder;
import lombok.Getter;

public class GiveTakeResponseDto {
    @Builder
    @Getter
    public static class Normal {
        private Long giveTakeId;
        private int giveYummy;
        private Long giveUserId;
        private Long takeUserId;
        private Long articleId;
    }
}
