package com.cocoa.catdog.helper.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class HelperDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordPost {
        @Email
        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
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
