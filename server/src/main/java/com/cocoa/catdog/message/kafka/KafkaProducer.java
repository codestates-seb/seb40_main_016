/*
package com.cocoa.catdog.message.kafka;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    //    @Value(value = "${message.topic.name}")
//    private String topicName;
    private static final String TOPIC = "oingdaddy";

    private final KafkaTemplate<String, String> kafkaTemplate;


    //    public void sendMessage(String message) {
//        System.out.println(String.format("Produce message : %s", message));
//        this.kafkaTemplate.send(topicName, message);
//    }
    @Async
    public void sendMessage(String message) {
        ProducerRecord<String, String> stringStringProducerRecord = new ProducerRecord<>(TOPIC, "key", "value");
        System.out.println(String.format("Produce message : %s", message));
        this.kafkaTemplate.send(stringStringProducerRecord);
    }
}*/
