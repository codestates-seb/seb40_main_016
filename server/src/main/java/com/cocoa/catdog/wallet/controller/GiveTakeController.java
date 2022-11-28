package com.cocoa.catdog.wallet.controller;

import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.wallet.dto.GiveTakeDto;
import com.cocoa.catdog.wallet.entity.GiveTake;
import com.cocoa.catdog.wallet.mapper.GiveTakeMapper;
import com.cocoa.catdog.wallet.service.GiveTakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/give")
@RequiredArgsConstructor
@Validated
public class GiveTakeController {
    private final JwtTokenizer jwtTokenizer;
    private final GiveTakeService giveTakeService;
    private final GiveTakeMapper giveTakeMapper;

    @PostMapping("/{article-id}")
    public ResponseEntity postGive (@RequestBody @Valid GiveTakeDto.Post giveTakePostDto,
                                    @PathVariable("article-id") Long articleId,
                                    @RequestHeader(name = "Authorization") String token) {
        Long userId = jwtTokenizer.getUserId(token);
        GiveTake giveTake = giveTakeMapper.PostToGiveTake(giveTakePostDto);
        GiveTake createdGiveTake = giveTakeService.createGiveTake(giveTake, articleId, userId);

        return new ResponseEntity<>(giveTakeMapper.giveTakeToNormalResponse(createdGiveTake), HttpStatus.CREATED);

    }
}
