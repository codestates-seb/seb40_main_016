package com.cocoa.catdog.order.dto;

import lombok.Getter;

import javax.validation.Valid;
import java.util.List;

public class OrderDto {
    @Getter
    public static class Post {
        @Valid
        private List<OrderItemDto.Post> orderItems;
    }
}
