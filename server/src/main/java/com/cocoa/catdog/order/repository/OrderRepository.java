package com.cocoa.catdog.order.repository;

import com.cocoa.catdog.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
