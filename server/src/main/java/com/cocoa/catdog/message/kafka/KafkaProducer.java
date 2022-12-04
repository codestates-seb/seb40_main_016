/*
package com.cocoa.catdog.message.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducer {
    private static final String TOPIC = "oingdaddy";

    private final KafkaTemplate<String, KafkaArticleDto> kafkaTemplate;

    @Async
    public void sendObject(KafkaArticleDto kafkaArticleDto) {
        log.info("ArticlePost : {}", kafkaArticleDto.toString());
        kafkaTemplate.send(TOPIC, kafkaArticleDto);
    }
}
*/
