package com.example.server.user.controller;

import com.example.server.auth.utils.UriCreator;
import com.example.server.user.dto.UserPatchDto;
import com.example.server.user.dto.UserPostDto;
import com.example.server.user.dto.UserResponseDto;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final UserMapper mapper;
  private final UserService userService;
  private final static String USER_DEFAULT_URL = "/users";


  // 회원 가입
  @PostMapping
  public ResponseEntity createUser(@RequestBody UserPostDto postDto) {
    log.info("##### CREATE USER #####");

    User user = mapper.userPostDtoToUser(postDto);
    User savedUser = userService.createUser(user);
    URI location = UriCreator.createUri(USER_DEFAULT_URL,savedUser.getId());

    return ResponseEntity.created(location).build();
  }

  //회원 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable Long id) {
    log.info("##### DELETE USER #####");
    log.trace("### MEMBER ID = {}",id);
    userService.deleteUser(id);

//    return new ResponseEntity(HttpStatus.NO_CONTENT);
    return ResponseEntity.noContent().build();
  }

  //회원 정보 수정
  @PatchMapping("/{id}")
  public ResponseEntity updateUser(@RequestBody UserPatchDto patchDto) {
    log.info("##### UPDATE USER #####");
    User user = mapper.userPatchDtoToUser(patchDto);
    User patchedUser = userService.updatedMember(user);
    URI location = UriCreator.createUri(USER_DEFAULT_URL,patchedUser.getId());

    return ResponseEntity.ok(location);
  }

  //회원 상세 정보 조회
  @GetMapping("/{id}")
  public ResponseEntity getUser(@PathVariable Long id) {
    log.info("##### GET USER #####");
    //TODO getUser 구현
    User findUser = userService.getUser(id);
    UserResponseDto userResponseDto = mapper.userToUserResponseDto(findUser);


    return ResponseEntity.ok(userResponseDto);
  }

  //TODO getUsers 만들어야하나?

}
