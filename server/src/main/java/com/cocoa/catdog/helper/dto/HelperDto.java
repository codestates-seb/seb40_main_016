package com.cocoa.catdog.helper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class HelperDto {
    @Getter
    @AllArgsConstructor
    public static class PasswordPost {
        @NotBlank
        private String email;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordResponse {
        private String address;
        private String title;
        private String message;
    }
}
