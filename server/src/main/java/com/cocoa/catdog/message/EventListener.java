package com.cocoa.catdog.message;

import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class EventListener {
    private final SseEmitterService sseEmitterService;

    @TransactionalEventListener
    @Async
    public void handleEvent(User findUser) {
        findUser.getFollowedUsers().forEach( user -> {
            sseEmitterService.send(user.getFollowingUser().getUserId(), "postArticle", "글등록을하셧습니당", "asd.com");
        } );
    }
}
