package com.cocoa.catdog.item.service;

import com.cocoa.catdog.comment.entity.Comment;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.item.entity.Item;
import com.cocoa.catdog.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {
    private final ItemRepository itemRepository;

    public Item createItem (Item item) {
        return itemRepository.save(item);
    }


    public Item findItem (Long itemId) {
        Optional<Item> optionalItem =
                itemRepository.findById(itemId);
        Item findItem =
                optionalItem.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
        return findItem;
    }

    public Page<Item> findItems(int page, int size) {
        return itemRepository.findAll(PageRequest.of(page, size, Sort.by("itemId").descending()));
    }
}
