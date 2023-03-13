package com.example.server.user.service;

import com.example.server.exception.BusinessLogicException;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public User createUser(User user) {
    log.info("user = {}", user);
    verifyExistsEmail(user.getEmail());

    return null;
  }




  // 회원이 존재하는지 검사
  private void verifyExistsEmail(String email) {
    if (userRepository.findByEmail(email).isPresent())
      throw new BusinessLogicException(UserException.MEMBER_EXIST);
  }

}
