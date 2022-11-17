package com.cocoa.catdog.item.repository;

import com.cocoa.catdog.item.dto.ItemResponseDto;
import com.cocoa.catdog.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
