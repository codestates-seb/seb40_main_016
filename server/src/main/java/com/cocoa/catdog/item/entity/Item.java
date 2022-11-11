package com.cocoa.catdog.item.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
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

    @ColumnDefault("url")
    private String itemImg;



}
