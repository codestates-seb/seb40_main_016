package com.cocoa.catdog.wallet.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class GiveTakeDto {
    @Getter
    public static class Post {
        @NotNull
        private int giveYummy;
    }
}
