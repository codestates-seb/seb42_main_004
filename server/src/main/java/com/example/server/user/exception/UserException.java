package com.example.server.user.exception;

import com.example.server.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
@Getter
@RequiredArgsConstructor
public enum UserException implements ExceptionCode {
  MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "Member Not Found"),
  MEMBER_EXIST(HttpStatus.CONFLICT, "Member is already Exist!"),
  MAILKEY_MISMATCH(HttpStatus.CONFLICT, "MailKey is mismatched");
//  MEMBER_JWT_EXIST(HttpStatus.CONFLICT, "JWT Registry Member is Exist");

  private final HttpStatus status;
  private final String message;
}
