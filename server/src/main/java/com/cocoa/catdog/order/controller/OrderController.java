package com.cocoa.catdog.order.controller;

import com.cocoa.catdog.auth.jwt.JwtTokenizer;
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
@RequestMapping("/order")
@RequiredArgsConstructor
@Validated
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    public ResponseEntity<OrderResponseDto> postOrder (@RequestBody @Valid OrderDto.Post postDto,
                                                       @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        Order order = orderMapper.postToOrder(postDto);
        Order createdOrder = orderService.createOrder(order, userId);

        return new ResponseEntity<>(orderMapper.orderToResponse(createdOrder), HttpStatus.CREATED);
    }

    @GetMapping("/my-page")
    public ResponseEntity<MultiResponseDto<OrderResponseDto>> getMyOrders(@RequestHeader(name = "Authorization") String token,
                                                                        @RequestParam(required = false, defaultValue = "1") int page) {
        Page<Order> orderPage = orderService.findProfileOrders(page, 10, jwtTokenizer.getUserId(token));
        List<Order> orders = orderPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderMapper.ordersToResponses(orders), orderPage), HttpStatus.OK);
    }

    @GetMapping("/profile/{user-id}")
    public ResponseEntity<MultiResponseDto<OrderResponseDto>> getOrdersOfUser(@PathVariable("{user-id}") Long userId,
                                                                        @RequestParam(required = false, defaultValue = "1") int page) {
        Page<Order> orderPage = orderService.findProfileOrders(page, 10, userId);
        List<Order> orders = orderPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(orderMapper.ordersToResponses(orders), orderPage), HttpStatus.OK);
    }
}
