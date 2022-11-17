package com.cocoa.catdog.order.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    private int orderPrice;

    private int quantity;

    @Builder
    public OrderItem (Long orderItemId, int orderPrice, int quantity) {
        this.orderItemId = orderItemId;
        this.orderPrice = orderPrice;
        this.quantity = quantity;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    @JsonBackReference
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)  // Response로 불러오기 실패 -> (LAZY -> EAGER)
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    //==연관관계메서드==//
    public void addOrder(Order order) {
        if(this.order == null) {
            this.order = order;
            order.addOrderItem(this);
        }
    }

    public void addItem(Item item) {
        if(this.item == null) {
            this.item = item;
        }
    }

}
