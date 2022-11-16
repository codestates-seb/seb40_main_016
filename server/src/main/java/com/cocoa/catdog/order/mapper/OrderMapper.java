package com.cocoa.catdog.order.mapper;

import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.order.dto.OrderDto;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.order.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    default Order postToOrder(OrderDto.Post post) {
        Order order = Order.builder().orderItems(new ArrayList<>()).build();
        post.getOrderItemPostDtos().stream().forEach(dto -> {
                Item item = Item.builder().itemId(dto.getItemId()).build();
                OrderItem orderItem = OrderItem.builder().quantity(dto.getQuantity()).build();
                orderItem.addOrder(order);
                orderItem.addItem(item);
            });

        return order;
    }


}
