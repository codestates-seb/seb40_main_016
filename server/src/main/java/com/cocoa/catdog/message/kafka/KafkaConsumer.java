/*
package com.cocoa.catdog.message.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class KafkaConsumer {
    @KafkaListener(topics = "oingdaddy", groupId = "oingdaddy", containerFactory = "kafkaListener")
    public void consume(KafkaArticleDto kafkaArticleDto) {
        log.info("Article : {}", kafkaArticleDto.getArticle().getContent());
        log.info("UserId : {}", kafkaArticleDto.getUserId().toString());
    }
}
*/
