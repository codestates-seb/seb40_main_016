package com.cocoa.catdog.wallet.mapper;

import com.cocoa.catdog.wallet.dto.WalletResponseDto;
import com.cocoa.catdog.wallet.entity.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WalletMapper {
    default WalletResponseDto.Single walletToResponse(Wallet wallet) {
        return WalletResponseDto.Single.builder()
                .walletId(wallet.getWalletId())
                .userId(wallet.getUser().getUserId())
                .yummy(wallet.getYummy())
                .build();
    }
}
