package com.example.server.init;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.user.data.Address;
import com.example.server.user.data.UserStatus;
import com.example.server.user.entity.User;
import com.example.server.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InitDB {
  private final InitUser initUser;

  @PostConstruct
  public void init() {
    initUser.UserInit();
  }

}

@Component
@Transactional
@RequiredArgsConstructor
class InitUser {

  private final CustomAuthorityUtils authorityUtils;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public void UserInit() {
    List<User> user = new ArrayList<>();

    user.add(User.builder().id(1L).email("admin@gmail.com").password(
            passwordEncoder.encode("admin")).name("관리자").roles(
            authorityUtils.createRoles("admin@gmail.com")).address(new Address()).status(UserStatus.USER_ADMIN)
        .phoneNumber("010-1234-1234").build());
    user.add(User.builder().id(2L).email("baram2449@naver.com").password(
            passwordEncoder.encode("qwe123")).name("위준성").roles(
            authorityUtils.createRoles("qwe@gmail.com")).address(new Address()).mailKey("QWERQWERQW")
        .phoneNumber("010-1234-1234").build());
    user.add(User.builder().id(3L).email("asd@gmail.com").password(
            passwordEncoder.encode("asd123")).name("진태양").roles(
            authorityUtils.createRoles("asd@gmail.com")).address(new Address())
        .phoneNumber("010-1234-1234").build());

    userRepository.saveAll(user);
  }
}


