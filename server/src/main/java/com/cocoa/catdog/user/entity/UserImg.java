package com.cocoa.catdog.user.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USERIMAGE")
public class UserImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userImgId;

    @Column(nullable = true)
    private String imgUrl;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
}
