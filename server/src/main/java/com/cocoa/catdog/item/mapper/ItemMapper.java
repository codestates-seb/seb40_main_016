package com.cocoa.catdog.item.mapper;

import com.cocoa.catdog.item.dto.ItemDto;
import com.cocoa.catdog.item.dto.ItemResponseDto;
import com.cocoa.catdog.item.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ItemMapper {
    Item PostToItem(ItemDto.Post post);
    ItemResponseDto.Single itemToResponse(Item item);
    List<ItemResponseDto.Single> itemsToResponses(List<Item> items);
}
