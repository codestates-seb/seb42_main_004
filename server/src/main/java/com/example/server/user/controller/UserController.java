package com.example.server.user.controller;

import com.example.server.auth.utils.UriCreator;
import com.example.server.user.dto.PasswordPatchDto;
import com.example.server.user.dto.RecoveryEmailSendDto;
import com.example.server.user.dto.RecoveryPasswordPatchDto;
import com.example.server.user.dto.ResendEmailDto;
import com.example.server.user.dto.UserPatchDto;
import com.example.server.user.dto.UserPostDto;
import com.example.server.user.dto.UserResponseDto;
import com.example.server.user.entity.User;
import com.example.server.user.mapper.UserMapper;
import com.example.server.user.service.UserService;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Positive;
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
import org.springframework.web.bind.annotation.RequestParam;
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
  public ResponseEntity createUser(@RequestBody UserPostDto postDto)
      throws MessagingException, UnsupportedEncodingException {
    log.info("##### CREATE USER #####");

    User user = mapper.userPostDtoToUser(postDto);
    User savedUser = userService.createUser(user);
    URI location = UriCreator.createUri(USER_DEFAULT_URL, savedUser.getId());

    return ResponseEntity.created(location).build();
  }

  //회원 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable Long id) {
    log.info("##### DELETE USER #####");
    log.trace("### MEMBER ID = {}", id);
    userService.deleteUser(id);

//    return new ResponseEntity(HttpStatus.NO_CONTENT);
    return ResponseEntity.noContent().build();
  }

  //회원 정보 수정
  @PatchMapping("/{id}")
  public ResponseEntity updateUser(@RequestBody UserPatchDto patchDto) {
    log.info("##### UPDATE USER #####");
    User user = mapper.userPatchDtoToUser(patchDto);
    User patchedUser = userService.updatedUser(user);
    URI location = UriCreator.createUri(USER_DEFAULT_URL, patchedUser.getId());

    return ResponseEntity.ok(location);
  }

  //회원 상세 정보 조회
  @GetMapping("/{id}")
  public ResponseEntity getUser(@PathVariable Long id) {
    log.info("##### GET USER #####");
    User findUser = userService.getUser(id);
    UserResponseDto userResponseDto = mapper.userToUserResponseDto(findUser);

    return ResponseEntity.ok(userResponseDto);
  }

  // 이메일키 인증
  @GetMapping("/email_auth")
  public void getEmailAuth(@RequestParam("id") @Positive Long id,
      @RequestParam("mailKey") String mailKey,
      HttpServletResponse response) throws IOException {

    userService.mailKeyAuth(id, mailKey);
    //TODO 우리 홈페이지 uri로 변경
    String redirectUri = "http://www.google.com";
    response.sendRedirect(redirectUri);
  }

  // 비밀번호 변경
  @PatchMapping("/{id}/password")
  public ResponseEntity updatePassword(@PathVariable Long id,
      @RequestBody PasswordPatchDto passwordPatchDto) {
    String password = passwordPatchDto.getPassword();
    String afterPassword = passwordPatchDto.getAfterPassword();
    userService.updatePassword(id, password, afterPassword);

    return ResponseEntity.ok().build();
  }

  // 리커버리 이메일 샌드
  @PostMapping("/recovery_email_send")
  public ResponseEntity recoveryEmailSend(@RequestBody RecoveryEmailSendDto dto)
      throws MessagingException, UnsupportedEncodingException {
    String emailSignUp = dto.getEmailSignUp();
    String emailNeedToSend = dto.getEmailNeedToSend();

    userService.recoveryEmailSend(emailSignUp, emailNeedToSend);

    return ResponseEntity.ok().build();
  }

  // 리커버리 진행
  @PatchMapping("/recovery")
  public ResponseEntity recovery(@RequestBody RecoveryPasswordPatchDto dto) {
    String email = dto.getEmail();
    String mailKey = dto.getMailKey();
    String afterPassword = dto.getAfterPassword();

    userService.recovery(email, mailKey, afterPassword);

    return ResponseEntity.ok().build();
  }

  //이메일 인증 다시 보내기
  @GetMapping("/resend")
  public ResponseEntity resend(@RequestBody ResendEmailDto dto)
      throws MessagingException, UnsupportedEncodingException {
    String email = dto.getEmail();
    userService.resendEmail(email);

    return ResponseEntity.ok().build();
  }

}
