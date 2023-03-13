package com.example.server.user.controller;

import com.example.server.auth.utils.UriCreator;
import com.example.server.user.dto.UserPostDto;
import com.example.server.user.entity.User;
import com.example.server.user.mapper.UserMapper;
import com.example.server.user.service.UserService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@RestController
//@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final UserMapper mapper;
  private final UserService userService;
  private final static String MEMBER_DEFAULT_URL = "/users";


  // 회원 가입
  @PostMapping
  public ResponseEntity createUser(@RequestBody UserPostDto postDto) {
    log.info("##### CREATE USER #####");
    //TODO createUser 구현

    User user = mapper.userPostDtoToUser(postDto);
    User savedUser = userService.createUser(user);
    URI location = UriCreator.createUri(MEMBER_DEFAULT_URL,savedUser.getId());



    return ResponseEntity.created(location).build();
  }

  //회원 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser() {
    log.info("##### DELETE USER #####");
    //TODO deleteUser 구현

    return null;
  }

  //회원 정보 수정
  @PatchMapping("/{id}")
  public ResponseEntity updateUser() {
    log.info("##### UPDATE USER #####");
    //TODO updateUser 구현

    return null;
  }

  //회원 상세 정보 조회
  @GetMapping("/{id}")
  public ResponseEntity getUser() {
    log.info("##### GET USER #####");
    //TODO getUser 구현

    return null;
  }

}
