package com.cocoa.catdog.order.dto;

import com.cocoa.catdog.order.entity.OrderItem;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class OrderResponseDto {
    private Long orderId;
    private Long userId;
    private Long walletId;
    private LocalDateTime createdAt;

    private List<OrderItemResponseDto> orderItems;
}
