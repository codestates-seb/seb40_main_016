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
@AllArgsConstructor
@Builder
public class Item extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private int price;

    private int stock;

    @Column(nullable = false)
    private String itemName;

    private String itemImg;



}
