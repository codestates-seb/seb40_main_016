package com.cocoa.catdog.wallet.entity;


import com.cocoa.catdog.audit.AuditingEntity;
import com.cocoa.catdog.order.entity.Order;
import com.cocoa.catdog.user.entity.User;
import lombok.*;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wallet extends AuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

    private int yummy;

    /*
    * Wallet 생성자
    * Wallet 생성시 User에 Wallet 등록
    * */
    public Wallet (int yummy, User user) {
        this.yummy = yummy;
        this.user = user;
        user.addWallet(this);
    }


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "WALLET_ID")
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "giveWlt")
    private List<GiveTake> gives = new ArrayList<>();

    @OneToMany(mappedBy = "takeWlt")
    private List<GiveTake> takes = new ArrayList<>();

    public void addUser(User user) {
        this.user = user;
    }

}
