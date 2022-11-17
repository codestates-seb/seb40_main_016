package com.cocoa.catdog.order.controller;

import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.order.dto.OrderDto;
import com.cocoa.catdog.order.dto.OrderResponseDto;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.mapper.OrderMapper;
import com.cocoa.catdog.order.service.OrderService;
import com.cocoa.catdog.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Validated
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    @PostMapping("/wallet")
    public ResponseEntity<OrderResponseDto> postOrder (@RequestBody @Valid OrderDto.Post postDto
                                                       /*@RequestParam Long userId*/) {
        Long userId = 1L;
        Order order = orderMapper.postToOrder(postDto);
        Order createdOrder = orderService.createOrder(order, userId);

        return new ResponseEntity<>(orderMapper.orderToResponse(createdOrder), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto<OrderResponseDto>> getOrders() {
        Page<Order> orderPage = orderService.findOrders(0, 10);
        List<Order> orders = orderPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderMapper.ordersToResponses(orders), orderPage), HttpStatus.OK);
    }
}
