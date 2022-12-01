package com.cocoa.catdog.message;

import lombok.NoArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Set;

public interface EmitterRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);
    Object saveEventCache(String emitterId, Object event);
    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String memberId);
    Map<String, Object> findAllEventCacheStartWithByMemberId(String memberId);
    void deleteById(String id);
    void deleteAllEmitterStartWithId(String memberId);
    void deleteAllEventCacheStartWithId(String memberId);
    int emittersSize();
    Map<String, SseEmitter> getEmitters();
    Map<String, Object> getEventCache();
}