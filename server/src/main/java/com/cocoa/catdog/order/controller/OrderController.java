package com.cocoa.catdog.order.controller;

import com.cocoa.catdog.order.dto.OrderDto;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.mapper.OrderMapper;
import com.cocoa.catdog.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Validated
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    @PostMapping("/wallet")
    public ResponseEntity postOrder (@RequestBody @Valid OrderDto.Post postDto,
                                     @RequestParam Long userId) {
        Order order = orderMapper.postToOrder(postDto);
        orderService.createOrder(order, userId);

        return new ResponseEntity(HttpStatus.OK);
    }
}
