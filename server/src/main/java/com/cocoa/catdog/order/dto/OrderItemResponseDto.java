package com.cocoa.catdog.order.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderItemResponseDto {
    private Long itemId;
    private int orderPrice;
    private int quantity;
}
