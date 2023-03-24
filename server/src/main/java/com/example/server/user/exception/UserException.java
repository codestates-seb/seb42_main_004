package com.example.server.user.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
@Getter
@RequiredArgsConstructor
public enum UserException implements ExceptionCode {
  USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User Not Found"),
  USER_EXIST(HttpStatus.CONFLICT, "User is already Exist!"),
  MAILKEY_MISMATCH(HttpStatus.CONFLICT, "Incorrect password."),
  INCORRECT_PASSWORD(HttpStatus.CONFLICT, "Password"),
  NOT_YET_AUTHENTICATE_EMAIL(HttpStatus.FORBIDDEN, "Do Not Authenticate Email Yet");
//  MEMBER_JWT_EXIST(HttpStatus.CONFLICT, "JWT Registry Member is Exist");

  private final HttpStatus status;
  private final String message;
}
