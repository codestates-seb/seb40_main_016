package com.cocoa.catdog.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPostDto {

    @NotBlank
    @Email
    private String email;


    @NotBlank
    private String userName;

    @NotBlank
    private String password;


    private String content;
/*    private String userType;
    private String userGender;*/

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

}