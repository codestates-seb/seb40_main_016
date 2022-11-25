package com.cocoa.catdog.order.service;

import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.item.service.ItemService;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.entity.OrderItem;
import com.cocoa.catdog.order.repository.OrderRepository;
import com.cocoa.catdog.user.service.UserService;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ItemService itemService;
    @Transactional
    public Order createOrder (Order order, Long userId) {
        Order savingOrder = new Order();
        Wallet wallet = userService.findUser(userId).getWallet();
        savingOrder.addWallet(wallet);

        order.getOrderItems().forEach(orderItem -> {
            Item savingItem = itemService.findItem(orderItem.getItem().getItemId());
            OrderItem savingOrderItem = OrderItem.builder()
                    .quantity(orderItem.getQuantity())
                    .orderPrice(savingItem.getPrice())
                    .build();

            savingItem.minusStock(orderItem.getQuantity()); //주문한 수량만큼 재고차감
            if(savingItem.getStock() < 0) {
                throw new BusinessLogicException(ExceptionCode.OUT_OF_STOCK); // 재고차감 후 재고가 음수면 에러처리
            }
            savingOrderItem.addItem(savingItem);
            savingOrderItem.addOrder(savingOrder);
            savingOrder.getWallet().minusYummy(savingOrderItem.getOrderPrice()* savingOrderItem.getQuantity()); // 주문한 총 금액만큼 yummy 차감
            if(savingOrder.getWallet().getYummy() < 0) {
                throw new BusinessLogicException(ExceptionCode.INSUFFICIENT_YUMMY); // yummy차감 후 yummy가 음수면 에러처리
            }


        });

        return orderRepository.save(savingOrder);
    }

    public Page<Order> findOrders (int page, int size) {
        return orderRepository.findAll(PageRequest.of(page, size, Sort.by("orderId").descending()));
    }

    public Page<Order> findProfileOrders(int page, int size, Long userId) {
        return orderRepository.findByWallet_User_UserId(userId, PageRequest.of(page, size, Sort.by("orderId").descending()));
    }


}
