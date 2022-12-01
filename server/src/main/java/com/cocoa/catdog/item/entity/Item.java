package com.cocoa.catdog.item.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.order.entity.OrderItem;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "items")
public class Item extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private int price;

    private int stock;

    @Column(nullable = false)
    private String itemName;

    private String itemImg;

    //==생성자==//
    @Builder
    public Item (Long itemId, int price, int stock, String itemName, String itemImg) {
        this.itemId = itemId;
        this.price = price;
        this.stock = stock;
        this.itemName = itemName;
        this.itemImg = itemImg;
    }


    public void minusStock(int stock) {
        this.stock -= stock;
    }


}
