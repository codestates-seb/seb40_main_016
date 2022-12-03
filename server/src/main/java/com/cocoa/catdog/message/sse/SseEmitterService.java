package com.cocoa.catdog.message.sse;

import com.cocoa.catdog.message.event.Event;
import com.cocoa.catdog.message.event.EventDto;
import com.cocoa.catdog.message.event.EventMapper;
import com.cocoa.catdog.message.event.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class SseEmitterService {
    private final EmitterRepository emitterRepository;
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public SseEmitter add (Long userId, String lastEventId) {
        String emitterId = "U"+userId+"@"+System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(10000L));

        log.info("new emitter added: {}", emitter.toString());
        log.info("emitter list size: {}", emitterRepository.emittersSize());
        log.info("emitter: {}", emitterRepository.getEmitters().toString());
        emitter.onCompletion(() -> {
            log.info("onCompletion call back : {}", emitterRepository.getEventCache().toString());
            emitterRepository.deleteById(emitterId);

        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitterRepository.deleteById(emitterId);
        });

        String eventId = "U"+userId+"@"+System.currentTimeMillis();
        sendEvent(emitter, eventId, emitterId, "EventStream is Created [user-id = "+userId+"]");

        if (!lastEventId.isEmpty()) {
            sendLostData(lastEventId, userId, emitterId, emitter);
        }

        return emitter;
    }

    public void sendEvent(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException e) {
            emitterRepository.deleteById(emitterId);
        }
    }


    public void send(EventDto eventDto) {
        Event event = eventRepository.save(eventMapper.DtoToEntity(eventDto));
        Long userId = event.getUserId();
        String eventId = "U"+userId+"@"+System.currentTimeMillis();
        Object eventCache = emitterRepository.saveEventCache(eventId, event);
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(userId.toString());
        emitters.forEach((key, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .id(eventId)
                        .data(event));
            } catch (IOException e){
                emitterRepository.deleteById(key);
            }
        });
    }


    private void sendLostData(String lastEventId, Long userId, String emitterId, SseEmitter emitter) {
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(userId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEachOrdered(entry -> sendEvent(emitter, entry.getKey(), emitterId, entry.getValue()));
    }



}
