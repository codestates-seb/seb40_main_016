package com.cocoa.catdog.item.dto;

import com.cocoa.catdog.response.PageInfo;
import com.cocoa.catdog.wallet.dto.WalletResponseDto;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import javax.persistence.Column;
import java.util.List;


public class ItemResponseDto {
    @Builder
    @Getter
    public static class Single {
        private Long itemId;

        private int price;

        private int stock;

        private String itemName;

        private String itemImg;
    }

    @Getter
    public static class Multi<T> {
        private List<T> items;
        private PageInfo pageInfo;
        private WalletResponseDto.Single wallet;

        public Multi(List<T> items, Page page, WalletResponseDto.Single wallet) {
            this.items = items;
            this.pageInfo = new PageInfo(page.getNumber() + 1,
                    page.getSize(), page.getTotalElements(), page.getTotalPages());
            this.wallet = wallet;
        }

    }
}
