package com.cocoa.catdog.helper.service;

import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.helper.dto.HelperDto;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class HelperService {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JavaMailSender mailSender;

    public HelperDto.PasswordResponse createMailAndChangePassword(String email, String userName){
        String str = getTempPassword();
        HelperDto.PasswordResponse dto = new HelperDto.PasswordResponse();
        dto.setAddress(email);
        dto.setTitle(userName+"님의 HOTTHINK 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. HOTTHINK 임시비밀번호 안내 관련 이메일 입니다." + "[" + userName + "]" +"님의 임시 비밀번호는 "
                + str + " 입니다.");
        updatePassword(str, email);
        return dto;
    }

    public void updatePassword(String str, String email){
        String pw = passwordEncoder.encode(str);
        User user = userService.findUserByEmail(email);
        user.setPassword(pw);
        userService.updateUser(user);
    }

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void mailSend(HelperDto.PasswordResponse response){
        System.out.println("이메일 전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(response.getAddress());
        message.setSubject(response.getTitle());
        message.setText(response.getMessage());
        System.out.println(message.getFrom()+", "+ Arrays.toString(message.getTo()) +", "+message.getSubject()+", "+message.getText());
        mailSender.send(message);
    }
    public void mailSend(String email, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(new String[]{ email });
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

}