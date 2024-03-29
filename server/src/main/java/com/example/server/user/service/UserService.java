package com.example.server.user.service;

import com.example.server.auth.dto.PrincipalDto;
import com.example.server.auth.jwt.JwtTokenizer;
import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.cart.entity.Cart;
import com.example.server.exception.BusinessLogicException;
import com.example.server.image.entity.UserImage;
import com.example.server.image.service.ImageService;
import com.example.server.user.data.UserStatus;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.multipart.MultipartFile;
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
  private final ImageService imageService;
  private final JwtTokenizer jwtTokenizer;

  public UserService(CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder,
      UserRepository userRepository, SpringTemplateEngine templateEngine,
      ApplicationEventPublisher publisher, ImageService imageService, JwtTokenizer jwtTokenizer) {
    this.authorityUtils = authorityUtils;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.templateEngine = templateEngine;
    this.publisher = publisher;
    this.imageService = imageService;
    this.jwtTokenizer = jwtTokenizer;
  }

  public User createUser(User user) throws MessagingException, UnsupportedEncodingException {
    log.info("user = {}", user);
    verifyExistsEmail(user.getEmail());

    setDefaultMemberInfo(user);

    user.setCart(Cart.builder().user(user).build());

    User save = userRepository.save(user);

    return save;
  }

  public void deleteUser(String email) {
    User findUser = userRepository.findByEmail(email)
        .orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));

    //지금은 완전삭제
    userRepository.delete(findUser);
  }

  public User updatedUser(User user) {
    User findUser = checkUserExist(user.getEmail());
    //검증 성공
    Optional.ofNullable(user.getName()).ifPresent(findUser::setName);
    Optional.ofNullable(user.getAddress()).ifPresent(findUser::setAddress);
    Optional.ofNullable(user.getPhoneNumber()).ifPresent(findUser::setPhoneNumber);
    Optional.ofNullable(user.getDeliveryInformation()).ifPresent(findUser::setDeliveryInformation);

    userRepository.save(findUser);
    return findUser;
  }

  // 패스워드 변경
  public User updatePassword(String email, String password, String afterPassword) {
    // 회원이 존재하는지 검증
    log.info("###회원이 존재하는지 검증합니다!");
    User findUser = checkUserExist(email);
    log.info("### 검증 완료!");
    // 비밀번호가 일치하는지 검증
    log.info("### 비밀번호가 일치하는지 검증합니다!");
    if (passwordEncoder.matches(password, findUser.getPassword())) {
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
    if (findUser.getMailKey().equals(mailKey)) {
      findUser.setPassword(passwordEncoder.encode(afterPassword));
      userRepository.save(findUser);
    } else {
      throw new BusinessLogicException(UserException.MAILKEY_MISMATCH);
    }

    return findUser;
  }


  // recovery email send
  @Async
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

  // recovery PW email send
  @Async
  public User recoveryPWEmailSend(String email)
      throws MessagingException, UnsupportedEncodingException {
    log.info("recoveryPWEmailSend");
    String newMailKey = createCode();
    User findUser = userRepository.findByEmail(email).orElse(null);
    if (findUser != null && findUser.getStatus().equals(UserStatus.USER_GOOGLE)) {
      simpleEmailSend(email);

    } else if (findUser != null) {
      findUser.setMailKey(newMailKey);
      userRepository.save(findUser);
      sendEmailRecovery(email, newMailKey);
    } else {
      sendEmailNoExist(email);
    }
    return findUser;

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
    List<String> roles = authorityUtils.createRoles(user.getEmail());
    user.setRoles(roles);
    log.info("member encryptedPassword = {}", encryptedPassword);
  }

  //simple email sender
  private void simpleEmailSend(String email) {
    //이메일 작성
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setTo(email);
    simpleMailMessage.setSubject("한끼밀입니다.");
    simpleMailMessage.setText("google Oauth로 가입된 회원입니다.");

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
    String href =
        "http://ec2-3-39-191-52.ap-northeast-2.compute.amazonaws.com:8080/users/email_auth?id=" + id
            + "&mailKey=" + mailKey;

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
    String href =
        "http://seb42-main-004-bucket.s3-website.ap-northeast-2.amazonaws.com/email/send/password?email="
            + email + "&mailKey=" + mailKey;

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
    String href = "http://seb42-main-004-bucket.s3-website.ap-northeast-2.amazonaws.com";

    MimeMessage message = mailSender.createMimeMessage();
    message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
    message.setSubject(title); //제목 설정
    message.setFrom(setFrom); //보내는 이메일
    message.setText(setContextDismatch(href), "utf-8", "html");

    return message;
  }

  public MimeMessage createEmailFormNoExist(String email)
      throws MessagingException, UnsupportedEncodingException {

//    String mailKey = createCode(); //인증 코드 생성
    String setFrom = "${spring.mail.username}"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
//    String setFrom = "hgm@hgm.com"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
    String toEmail = email; //받는 사람
    String title = "한끼밀 계정 복구 서비스입니다."; //제목
    String href = "http://seb42-main-004-bucket.s3-website.ap-northeast-2.amazonaws.com";

    MimeMessage message = mailSender.createMimeMessage();
    message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
    message.setSubject(title); //제목 설정
    message.setFrom(setFrom); //보내는 이메일
    message.setText(setContextNoExist(href), "utf-8", "html");

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

  public String setContextNoExist(String href) {
    Context context = new Context();
    context.setVariable("href", href);
    return templateEngine.process("noExist", context); //noExist.html

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


  public String sendEmailRecovery(String toEmail, String mailKey)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailFormRecovery(toEmail, mailKey);
    //실제 메일 전송
    mailSender.send(emailForm);

    return mailKey;
  }


  public void sendEmailDismatch(String toEmail)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailFormDismatch(toEmail);
    //실제 메일 전송
    mailSender.send(emailForm);

  }


  public void sendEmailNoExist(String toEmail)
      throws MessagingException, UnsupportedEncodingException {

    //메일전송에 필요한 정보 설정
    MimeMessage emailForm = createEmailFormNoExist(toEmail);
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

  public void postUserImage(Long id, MultipartFile file) {
    User user = getUser(id);
    UserImage userImage = imageService.uploadUserImage(file, user);
    user.setImage(userImage);
    userRepository.save(user);
  }

  public void checkActive(User user) {
    if (user.getStatus() == UserStatus.USER_TMP) {
      throw new BusinessLogicException(UserException.NOT_YET_AUTHENTICATE_EMAIL);
    } else if (user.getStatus() != UserStatus.USER_ACTiVE
        && user.getStatus() != UserStatus.USER_GOOGLE) {
      throw new BusinessLogicException(UserException.NOT_ACTIVE_USER);
    }
  }

  public Boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  public User authUserSave(User user) {
    List<String> roles = authorityUtils.createRoles(user.getEmail());
    user.setRoles(roles);
    user.setCart(Cart.builder().user(user).build());
    user.setStatus(UserStatus.USER_GOOGLE);

    return userRepository.save(user);
  }

  public String delegateAccessToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    PrincipalDto principal = PrincipalDto.builder().id(user.getId()).email(user.getEmail())
        .name(user.getName()).build();
    claims.put("username", user.getEmail());
    claims.put("roles", user.getRoles());
    claims.put("principal", principal);
    log.info("###### principal = {} ", principal);

    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getAccessTokenExpirationMinutes());

    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
        base64EncodedSecretKey);

    return accessToken;
  }

  // (6)
  public String delegateRefreshToken(User user) {
    String subject = user.getEmail();
    Date expiration = jwtTokenizer.getTokenExpiration(
        jwtTokenizer.getRefreshTokenExpirationMinutes());
    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

    String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
        base64EncodedSecretKey);

    return refreshToken;
  }

  public void checkGoogleAuth(User user) {
    if (!user.getStatus().equals(UserStatus.USER_GOOGLE)) {
      throw new BusinessLogicException(UserException.NOT_GOOGLE_USER);
    }
  }

  public void checkNotGoogleAuth(User user) {
    log.info("### user.getStatus() = " + user.getStatus());
    log.info(UserStatus.USER_GOOGLE.toString());
    if (user.getStatus().equals(UserStatus.USER_GOOGLE)) {
      throw new BusinessLogicException(UserException.GOOGLE_USER);
    }
  }

}
