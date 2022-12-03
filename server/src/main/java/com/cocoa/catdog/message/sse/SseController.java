package com.cocoa.catdog.message.sse;

import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.message.sse.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SseController {
    private final SseEmitterService sseEmitterService;
    private final JwtTokenizer jwtTokenizer;


    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> test(@RequestHeader(name = "Authorization", required = true) String token,
                                           @RequestHeader(name = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        SseEmitter emitter = sseEmitterService.add(jwtTokenizer.getUserId(token), lastEventId);

        return ResponseEntity.ok(emitter);
    }

    /*@PostMapping("/count")
    public ResponseEntity<Void> count() {
        sseEmitterService.count();
        return ResponseEntity.ok().build();
    }*/
}
