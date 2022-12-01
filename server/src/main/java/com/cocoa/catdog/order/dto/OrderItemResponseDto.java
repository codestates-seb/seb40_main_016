package com.cocoa.catdog.order.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderItemResponseDto {
    private Long itemId;
    private String itemName;
    private String itemImg;
    private int orderPrice;
    private int quantity;
}
