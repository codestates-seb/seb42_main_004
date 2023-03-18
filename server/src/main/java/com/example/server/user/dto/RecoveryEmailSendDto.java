package com.example.server.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class RecoveryEmailSendDto {

  private String emailSignUp;
  private String emailNeedToSend;

}
