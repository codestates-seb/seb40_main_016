package com.cocoa.catdog.order.mapper;

import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.order.dto.OrderDto;
import com.cocoa.catdog.order.dto.OrderItemResponseDto;
import com.cocoa.catdog.order.dto.OrderResponseDto;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    default Order postToOrder(OrderDto.Post post) {
        Order order = new Order();
        post.getOrderItems().stream().forEach(dto -> {
                Item item = Item.builder().itemId(dto.getItemId()).build();
                OrderItem orderItem = OrderItem.builder().quantity(dto.getQuantity()).build();
                orderItem.addOrder(order);
                orderItem.addItem(item);
            });

        return order;
    }

    List<OrderResponseDto> ordersToResponses(List<Order> orders);

    default OrderItemResponseDto orderItemToResponse(OrderItem orderItem) {
        return OrderItemResponseDto.builder()
                .itemId(orderItem.getItem().getItemId())
                .orderPrice(orderItem.getOrderPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

    default OrderResponseDto orderToResponse(Order order) {
        return OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .userId(order.getWallet().getUser().getUserId())
                .walletId(order.getWallet().getWalletId())
                .createdAt(order.getCreatedAt())
                .orderItems(
                        order.getOrderItems().stream()
                                .map(this::orderItemToResponse)
                                .collect(Collectors.toList()))
                .build();

    }

}
