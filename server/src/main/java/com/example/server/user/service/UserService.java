package com.example.server.user.service;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.exception.BusinessLogicException;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

  private final CustomAuthorityUtils authorityUtils;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final ApplicationEventPublisher publisher;

  public UserService(CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder,
      UserRepository userRepository, ApplicationEventPublisher publisher) {
    this.authorityUtils = authorityUtils;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.publisher = publisher;
  }

  public User createUser(User user) {
    log.info("user = {}", user);
    verifyExistsEmail(user.getEmail());

    setDefaultMemberInfo(user);
    User save = userRepository.save(user);

    return save;
  }

  public void deleteUser(Long userId) {
    User findUser = userRepository.findById(userId)
        .orElseThrow(() -> new BusinessLogicException(UserException.MEMBER_NOT_FOUND));

    //지금은 완전삭제
    userRepository.delete(findUser);
  }

  public User updatedMember(User user) {
    User findUser = checkUserExist(user.getId());
    //검증 성공
    Optional.ofNullable(user.getPassword()).ifPresent(findUser::setPassword);
    Optional.ofNullable(user.getName()).ifPresent(findUser::setName);
    Optional.ofNullable(user.getAddress()).ifPresent(findUser::setAddress);
    Optional.ofNullable(user.getPhoneNumber()).ifPresent(findUser::setPhoneNumber);

    userRepository.save(findUser);
    return findUser;
  }

  public User getUser(Long userId) {
    User findUser = userRepository.findById(userId)
        .orElseThrow(() -> new BusinessLogicException(UserException.MEMBER_NOT_FOUND));

    return findUser;
  }


  // 회원이 존재하는지 검사 , 존재하면 예외
  private void verifyExistsEmail(String email) {
    if (userRepository.findByEmail(email).isPresent()) {
      throw new BusinessLogicException(UserException.MEMBER_EXIST);
    }
  }

  // 회원이 존재하지 않으면 예외발생
  public User checkUserExist(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new BusinessLogicException(UserException.MEMBER_NOT_FOUND));
  }

  private void setDefaultMemberInfo(User user) {
    // 패스워드 암호화
    String encryptedPassword = Optional.ofNullable(passwordEncoder.encode(user.getPassword()))
        .get();
    user.setPassword(encryptedPassword);
    // db에 유저 role 저장
//    TODO 시큐리티 비활성화
    List<String> roles = authorityUtils.createRoles(user.getEmail());
    user.setRoles(roles);
    log.info("member encryptedPassword = {}", encryptedPassword);
  }

}
