package com.cocoa.catdog.message.event;

import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.message.sse.SseEmitterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import java.io.IOException;

@Component
@RequiredArgsConstructor @Slf4j
public class EventListener {
    private final SseEmitterService sseEmitterService;
    private final ArticleService articleService;

    @TransactionalEventListener
    @Async
    public void handleEventMessage(EventDto.Message eventDto) throws InterruptedException {
        log.info("~메세지전송~ articleId : {}", eventDto.getUrl());
        sseEmitterService.send(eventDto);
    }

    @TransactionalEventListener
    @Async
    public void handleEventPostArticle(EventDto.PostArticle eventDto) throws InterruptedException, IOException {
        articleService.saveArticle(eventDto.getArticle(), eventDto.getUserId(),
            FileConverter.filesToMultipartFiles(eventDto.getFiles())
        );
    }
}
