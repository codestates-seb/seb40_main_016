package com.cocoa.catdog.message.kafka;

import lombok.RequiredArgsConstructor;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
@Validated
public class KafkaController {
    private final KafkaProducer producer;

    @PostMapping
    public String sendMessages() {
        producer.sendMessage("kafkaTest");

        return "success";
    }
    @PostMapping("/test")
    private String asdMessage() {
        return "test";
    }
}
