package com.cocoa.catdog.order.repository;

import com.cocoa.catdog.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByWallet_User_UserId(Long userId, Pageable pageable);
}
