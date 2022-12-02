package com.cocoa.catdog.message;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {
    private final ApplicationEventPublisher eventPublisher;

    @Async
    public void sendCreateArticleMessage (User user, Article article) {
        String type = "create new article";
        String content = user.getUserId() + "번 유저가 새로운 글을 등록하셨습니다.";
        String url = "articleId = " + article.getArticleId();
        boolean isRead = false;
        user.getFollowedUsers().forEach(follow -> {
            EventDto eventDto = EventDto.builder()
                    .type(type)
                    .content(content)
                    .url(url)
                    .isRead(isRead)
                    .userId(follow.getFollowingUser().getUserId())
                    .build();

            eventPublisher.publishEvent(eventDto);
        });
    }

    public void sendGetCommentMessage (User user, Comment comment) {
        Article article = comment.getArticle();
        String type = "get new comment";
        String content = user.getUserId() + "번 유저가 당신의 " + article.getArticleId() + "번 글에 댓글을 등록하셨습니다.";
        String url = "articleId = " + article.getArticleId();
        boolean isRead = false;
        EventDto eventDto = EventDto.builder()
                .type(type)
                .content(content)
                .url(url)
                .isRead(isRead)
                .userId(article.getUser().getUserId())
                .build();

        eventPublisher.publishEvent(eventDto);
    }
}
