package com.cocoa.catdog.order.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

public class OrderItemDto {
    @Getter
    public static class Post {
        @NotNull
        private Long itemId;

        @NotNull
        private int quantity;
    }
}
