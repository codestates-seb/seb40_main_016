package com.cocoa.catdog.message.event;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service @Slf4j
@Transactional
@RequiredArgsConstructor
public class EventService {
    private final ApplicationEventPublisher eventPublisher;

    @Async
    public void sendCreateArticleMessage (User user, Article article) {
        String type = "create new article";
        String content = user.getUserName() + "님이 새로운 글을 등록하셨습니다.";
        String url = "articleId = " + article.getArticleId();
        boolean isRead = false;
        user.getFollowedUsers().forEach(follow -> {
            EventDto.Message eventDto = EventDto.Message.builder()
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
        String content = user.getUserName() + "님이 당신의 게시물에 댓글을 등록하셨습니다.";
        String url = "articleId = " + article.getArticleId();
        boolean isRead = false;
        EventDto.Message eventDto = EventDto.Message.builder()
                .type(type)
                .content(content)
                .url(url)
                .isRead(isRead)
                .userId(article.getUser().getUserId())
                .build();

        eventPublisher.publishEvent(eventDto);
    }

    public void postArticle (Article article, Long userId, List<MultipartFile> files) {
        List<File> collect = files.stream().map(FileConverter::multipartFileToFile).collect(Collectors.toList());


        eventPublisher.publishEvent(EventDto.PostArticle.builder()
                .article(article)
                .userId(userId)
                .files(collect)
                .build()
        );
    }
}
