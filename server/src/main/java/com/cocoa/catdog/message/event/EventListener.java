package com.cocoa.catdog.message.event;

import com.cocoa.catdog.message.sse.SseEmitterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor @Slf4j
public class EventListener {
    private final SseEmitterService sseEmitterService;

    @TransactionalEventListener
    @Async
    public void handleEvent(EventDto eventDto) throws InterruptedException {
        log.info("~메세지전송~ articleId : {}", eventDto.getUrl());
        sseEmitterService.send(eventDto);
    }
}
