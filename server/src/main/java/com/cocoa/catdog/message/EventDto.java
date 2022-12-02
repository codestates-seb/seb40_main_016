package com.cocoa.catdog.message;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Builder
public class EventDto {

    private Long eventId;

    private String type;

    private String content;

    private String url;

    private boolean isRead;

    private Long userId;
}
