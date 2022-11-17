package com.cocoa.catdog.item.controller;

import com.cocoa.catdog.auth.jwt.JwtTokenizer;
import com.cocoa.catdog.item.dto.ItemDto;
import com.cocoa.catdog.item.dto.ItemResponseDto;
import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.item.mapper.ItemMapper;
import com.cocoa.catdog.item.service.ItemService;
import com.cocoa.catdog.response.MultiResponseDto;
import com.cocoa.catdog.response.PageInfo;
import com.cocoa.catdog.user.service.UserService;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.cocoa.catdog.wallet.mapper.WalletMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
@Validated
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final UserService userService;
    private final WalletMapper walletMapper;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    public ResponseEntity postItem(@RequestBody @Valid ItemDto.Post postDto) {
        Item item = itemMapper.PostToItem(postDto);
        Item createdItem = itemService.createItem(item);
        return new ResponseEntity<>(itemMapper.itemToResponse(createdItem), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getItems(@RequestHeader(name = "Authorization", required = false) String token) {
        Page<Item> itemPage = itemService.findItems(0, 10);
        List<Item> items = itemPage.getContent();
//        Wallet wallet = userService.findUser(jwtTokenizer.getUserId(token)).getWallet();
        Wallet wallet = userService.findUser(1L).getWallet();
        new ItemResponseDto.Multi(itemMapper.itemsToResponses(items), itemPage, walletMapper.walletToResponse(wallet));

        return new ResponseEntity<>(
                new ItemResponseDto.Multi<>(itemMapper.itemsToResponses(items), itemPage, walletMapper.walletToResponse(wallet)), HttpStatus.OK);
    }
}
