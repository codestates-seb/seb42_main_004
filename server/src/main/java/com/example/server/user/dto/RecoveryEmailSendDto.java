package com.example.server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class RecoveryEmailSendDto {

  @NotNull
  @Email
  private String emailSignUp;
  @NotNull
  @Email
  private String emailNeedToSend;

}
