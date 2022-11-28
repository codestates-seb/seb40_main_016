package com.cocoa.catdog.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/modify")
    public String modify() {
        return "modify";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }
}