package com.cocoa.catdog.message.event;

import com.cocoa.catdog.article.entity.Article;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.File;
import java.util.List;


public class EventDto {
    @Getter
    @Builder
    public static class Message {

        private Long eventId;

        private String type;

        private String content;

        private String url;

        private boolean isRead;

        private Long userId;

    }
    @Getter
    @Builder
    public static class PostArticle {
        private Article article;

        private Long userId;

        private List<File> files;
    }

}

