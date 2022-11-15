package com.cocoa.catdog.wallet.entity;

import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Wallet extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

    private int yummy;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setUser(User user) {
        this.user = user;
        if (user.getWallet() != this) {
            user.setWallet(this);
        }
    }

    @OneToMany(mappedBy = "orderId")
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "giveWlt")
    private List<GiveTake> gives = new ArrayList<>();

    @OneToMany(mappedBy = "takeWlt")
    private List<GiveTake> takes = new ArrayList<>();

}
