package com.example.server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RecoveryPWEmailSendDto {
  @NotNull
  @Email
  private String email;

}
