package com.example.server.user.service;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.exception.BusinessLogicException;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
  private final CustomAuthorityUtils authorityUtils;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public User createUser(User user) {
    log.info("user = {}", user);
    verifyExistsEmail(user.getEmail());
    setDefaultMemberInfo(user);
    User save = userRepository.save(user);

    return save;
  }
  public void deleteUser(Long userId) {
    User findUser = userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(UserException.MEMBER_NOT_FOUND));

    //지금은 완전삭제
    userRepository.delete(findUser);
  }




  // 회원이 존재하는지 검사
  private void verifyExistsEmail(String email) {
    if (userRepository.findByEmail(email).isPresent())
      throw new BusinessLogicException(UserException.MEMBER_EXIST);
  }

  private void setDefaultMemberInfo(User user) {
    String encryptedPassword = Optional.ofNullable(passwordEncoder.encode(user.getPassword())).get();
    user.setPassword(encryptedPassword);
    List<String> roles = authorityUtils.createRoles(user.getEmail());
    user.setRoles(roles);
    log.info("member encryptedPassword = {}", encryptedPassword);
  }

}
