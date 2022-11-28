package com.cocoa.catdog.message;

import com.cocoa.catdog.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;
    @Column(nullable = false)
    private String type;

    private String content;

    private String url;

    @Column(nullable = false)
    private boolean isRead;

    private Long userId;


    @Builder
    public Event (Long userId, String type, String content, String url, boolean isRead) {
        this.userId = userId;
        this.type = type;
        this.content = content;
        this.url = url;
        this.isRead = isRead;
    }
}
