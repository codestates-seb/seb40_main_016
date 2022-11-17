package com.cocoa.catdog.wallet.dto;

import lombok.Builder;
import lombok.Getter;


public class WalletResponseDto {

    @Getter @Builder
    public static class Single {
        private Long walletId;
        private Long userId;
        private int yummy;
    }
}
