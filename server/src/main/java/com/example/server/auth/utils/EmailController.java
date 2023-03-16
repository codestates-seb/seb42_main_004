package com.example.server.auth.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
  @Autowired
  private JavaMailSender mailSender;

  @PostMapping("/send")
  public ResponseEntity send() {
    //이메일 작성
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setTo("baram2449@naver.com");
    simpleMailMessage.setSubject("이메일 타이틀~");
    simpleMailMessage.setText("이메일 내용~");

    //이메일 발신
    mailSender.send(simpleMailMessage);

    //결과 반환
    return ResponseEntity.ok().build();
  }

}
