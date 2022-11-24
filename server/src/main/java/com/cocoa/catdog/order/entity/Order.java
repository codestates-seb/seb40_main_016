package com.cocoa.catdog.order.entity;

import com.cocoa.catdog.article.entity.Like;
import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor //Order 생성은 빈 생성자로 생성 후 -> addWallet(), addOrderItem()
@Table(name = "orders")
public class Order extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WALLET_ID")
    private Wallet wallet;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> orderItems = new ArrayList<>();


    //==연관관계 메서드==//
    public void addWallet(Wallet wallet) {
        if(this.wallet == null) {
            this.wallet = wallet;
            wallet.addOrder(this);
        }
    }

    public void addOrderItem(OrderItem orderItem) {
        if(!orderItems.contains(orderItem)) {
            orderItems.add(orderItem);
            orderItem.addOrder(this);
        }
    }

    public void changeOrderItem(OrderItem orderItem) {
        if(orderItems.contains(orderItem)){

        }
    }

}
