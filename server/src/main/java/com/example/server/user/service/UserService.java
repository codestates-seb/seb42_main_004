package com.example.server.user.service;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.exception.BusinessLogicException;
import com.example.server.user.data.UserStatus;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
@Slf4j
@EnableAsync
public class UserService {

  private final CustomAuthorityUtils authorityUtils;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  @Autowired
  private JavaMailSender mailSender;
  private final SpringTemplateEngine templateEngine;
  private final ApplicationEventPublisher publisher;

  public UserService(CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder,
      UserRepository userRepository, SpringTemplateEngine templateEngine,
      ApplicationEventPublisher publisher) {
    this.authorityUtils = authorityUtils;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.templateEngine = templateEngine;
    this.publisher = publisher;
  }

  public User createUser(User user) throws MessagingException, UnsupportedEncodingException {
    log.info("user = {}", user);
    verifyExistsEmail(user.getEmail());

    setDefaultMemberInfo(user);

    User save = userRepository.save(user);

    sendEmail(user.getEmail(), user.getMailKey(), user.getId());

    return save;
  }

  public void deleteUser(Long userId) {
    User findUser = userRepository.findById(userId)
        .orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));

    //지금은 완전삭제
    userRepository.delete(findUser);
  }

  public User updatedUser(User user) {
    User findUser = checkUserExist(user.getId());
    //검증 성공
    Optional.ofNullable(user.getName()).ifPresent(findUser::setName);
    Optional.ofNullable(user.getAddress()).ifPresent(findUser::setAddress);
    Optional.ofNullable(user.getPhoneNumber()).ifPresent(findUser::setPhoneNumber);
    Optional.ofNullable(user.getDeliveryInformation()).ifPresent(findUser::setDeliveryInformation);

    userRepository.save(findUser);
    return findUser;
  }

  // 패스워드 변경
  public User updatePassword(Long id, String password, String afterPassword) {
    // 회원이 존재하는지 검증
    User findUser = checkUserExist(id);
    // 비밀번호가 일치하는지 검증
    if (passwordEncoder.encode(password).equals(passwordEncoder.encode(findUser.getPassword()))) {
      findUser.setPassword(passwordEncoder.encode(afterPassword));
      userRepository.save(findUser);
    } else {
      throw new BusinessLogicException(UserException.INCORRECT_PASSWORD);
    }
    return findUser;
  }
  // 메일 인증을 통한 리커버리
  public User recovery(String email, String mailKey, String afterPassword) {
    //회원이 존재하는지 검증
    User findUser = checkUserExist(email);
    //메일 키가 일치하는지 검증
    if(findUser.getMailKey().equals(mailKey)) {
      findUser.setPassword(passwordEncoder.encode(afterPassword));
      userRepository.save(findUser);
    }
    else throw new BusinessLogicException(UserException.MAILKEY_MISMATCH);

    return findUser;
  }


  // recovery email send
  public void recoveryEmailSend(String emailSignUp, String emailNeedToSend)
      throws MessagingException, UnsupportedEncodingException {
    String newMailKey = createCode();
    User findUser = userRepository.findByEmail(emailSignUp).get();
    if (emailSignUp.equals(emailNeedToSend)) {
      findUser.setMailKey(newMailKey);
      userRepository.save(findUser);
      sendEmailRecovery(emailSignUp, newMailKey);
    } else {
      sendEmailDismatch(emailNeedToSend);
    }

  }

  public User getUser(Long userId) {
    User findUser = userRepository.findById(userId)
        .orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));

    return findUser;
  }


  // 회원이 존재하는지 검사 , 존재하면 예외
  private void verifyExistsEmail(String email) {
    if (userRepository.findByEmail(email).isPresent()) {
      throw new BusinessLogicException(UserException.USER_EXIST);
    }
  }

  // 회원이 존재하지 않으면 예외발생
  public User checkUserExist(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));
  }
  // 회원이 존재하지 않으면 예외발생 by email
  public User checkUserExist(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));
  }

  private void setDefaultMemberInfo(User user) {
    // 패스워드 암호화
    String encryptedPassword = Optional.ofNullable(passwordEncoder.encode(user.getPassword()))
        .get();
    user.setPassword(encryptedPassword);
    user.setMailKey(createCode());
    // db에 유저 role 저장
//    TODO 시큐리티 비활성화
    List<String> roles = authorityUtils.createRoles(user.getEmail());
    user.setRoles(roles);
    log.info("member encryptedPassword = {}", encryptedPassword);
  }

  //simple email sender
  private void signUpEmailSend() {
    //이메일 작성
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setTo("baram2449@naver.com");
    simpleMailMessage.setSubject("이메일 타이틀~");
    simpleMailMessage.setText("이메일 내용~");

    //이메일 발신
    mailSender.send(simpleMailMessage);
  }

  public String createCode() {
    Random random = new Random();
    StringBuffer key = new StringBuffer();

    for (int i = 0; i < 10; i++) {
      int index = random.nextInt(3);

      switch (index) {
        case 0:
          key.append((char) ((int) random.nextInt(26) + 97));
          break;
        case 1:
          key.append((char) ((int) random.nextInt(26) + 65));
          break;
        case 2:
          key.append(random.nextInt(9));
          break;
      }
    }
    return key.toString();
  }

  //메일 양식 작성
  public MimeMessage createEmailForm(String email, String mailKey, Long id)
      throws MessagingException, UnsupportedEncodingException {

//    String mailKey = createCode(); //인증 코드 생성
    String setFrom = "${spring.mail.username}"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
//    String setFrom = "hgm@hgm.com"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
    String toEmail = email; //받는 사람
    String title = "한끼밀 이메일 인증"; //제목
    //TODO href 수정
    String href = "http://localhost:8080/users/email_auth?id=" + id + "&mailKey=" + mailKey;

    MimeMessage message = mailSender.createMimeMessage();
    message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
    message.setSubject(title); //제목 설정
    message.setFrom(setFrom); //보내는 이메일
    message.setText(setContext(href), "utf-8", "html");

    return message;
  }

  //메일 양식 작성
  public MimeMessage createEmailFormRecovery(String email, String mailKey)
      throws MessagingException, UnsupportedEncodingException {

//    String mailKey = createCode(); //인증 코드 생성
    String setFrom = "${spring.mail.username}"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
//    String setFrom = "hgm@hgm.com"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
    String toEmail = email; //받는 사람
    String title = "한끼밀 계정 복구 서비스입니다."; //제목
    //TODO href 수정
    String href = "http://localhost:8080/users/recovery?email=" + email + "&mailKey=" + mailKey;

    MimeMessage message = mailSender.createMimeMessage();
    message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
    message.setSubject(title); //제목 설정
    message.setFrom(setFrom); //보내는 이메일
    message.setText(setContextRecovery(href), "utf-8", "html");

    return message;
  }

  public MimeMessage createEmailFormDismatch(String email)
      throws MessagingException, UnsupportedEncodingException {

//    String mailKey = createCode(); //인증 코드 생성
    String setFrom = "${spring.mail.username}"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
//    String setFrom = "hgm@hgm.com"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
    String toEmail = email; //받는 사람
    String title = "한끼밀 계정 복구 서비스입니다."; //제목
    //TODO href 수정
    String href = "http://localhost:8080/home";

    MimeMessage message = mailSender.createMimeMessage();
    message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
    message.setSubject(title); //제목 설정
    message.setFrom(setFrom); //보내는 이메일
    message.setText(setContextDismatch(href), "utf-8", "html");

    return message;
  }

  //타임리프를 이용한 context 설정
  public String setContext(String href) {
    Context context = new Context();
    context.setVariable("href", href);
    return templateEngine.process("emailAuth", context); //mail.html

  }

  //타임리프를 이용한 context 설정
  public String setContextRecovery(String href) {
    Context context = new Context();
    context.setVariable("href", href);
    return templateEngine.process("recovery", context); //recovery.html

  }
  //타임리프를 이용한 context 설정
  public String setContextDismatch(String href) {
    Context context = new Context();
    context.setVariable("href", href);
    return templateEngine.process("dismatch", context); //dismatch.html

  }

  //실제 메일 전송
  @Async
  public String sendEmail(String toEmail, String mailKey, Long id)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailForm(toEmail, mailKey, id);
    //실제 메일 전송
    mailSender.send(emailForm);

    return mailKey;
  }

  @Async
  public String sendEmailRecovery(String toEmail, String mailKey)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailFormRecovery(toEmail, mailKey);
    //실제 메일 전송
    mailSender.send(emailForm);

    return mailKey;
  }
  @Async
  public void sendEmailDismatch(String toEmail)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailFormDismatch(toEmail);
    //실제 메일 전송
    mailSender.send(emailForm);

  }

  public void mailKeyAuth(Long id, String mailKey) {
    User findUser = checkUserExist(id);
    if (findUser.getMailKey().equals(mailKey)) {
      findUser.setStatus(UserStatus.USER_ACTiVE);
      userRepository.save(findUser);
    } else {
      throw new BusinessLogicException(UserException.MAILKEY_MISMATCH);
    }


  }

  @Async
  public void resendEmail(String email) throws MessagingException, UnsupportedEncodingException {
    User findUser = checkUserExist(email);

    sendEmail(email, findUser.getMailKey(), findUser.getId());
  }


}
