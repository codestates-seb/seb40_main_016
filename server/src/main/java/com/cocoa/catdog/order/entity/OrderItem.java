package com.cocoa.catdog.order.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.wallet.entity.Wallet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
public class OrderItem extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    private int orderPrice;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
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
