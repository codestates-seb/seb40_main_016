package com.cocoa.catdog.order.service;

import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.repository.OrderRepository;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    public Order createOrder (Order order, Long userId) {
        User user = userService.findUser(userId);
        return order;
    }
}
