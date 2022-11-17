package com.cocoa.catdog.item.dto;

import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ItemDto {
    @Getter
    public static class Post {
        @NotNull
        private int price;
        @NotNull
        private int stock;

        @NotBlank
        private String itemName;
        @NotBlank
        private String itemImg;
    }
}
