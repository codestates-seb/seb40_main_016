package com.cocoa.catdog.helper.controller;

import com.cocoa.catdog.helper.dto.HelperDto;
import com.cocoa.catdog.helper.service.HelperService;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/help")
@Validated
@RequiredArgsConstructor
public class HelperController {
    private final UserService userService;
    private final HelperService helperService;


    @PostMapping("/pw")
    public ResponseEntity findPassword (@RequestBody @Valid HelperDto.PasswordPost requestBody) {
        String email = requestBody.getEmail();
        User user = userService.findUserByEmail(email);

        helperService.mailSend(helperService.createMailAndChangePassword(email, user.getUserName()));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
