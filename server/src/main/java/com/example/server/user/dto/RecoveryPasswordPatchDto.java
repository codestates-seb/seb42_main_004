package com.example.server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RecoveryPasswordPatchDto {
  @NotNull
  @Email
  private String email;
  @NotNull
  private String mailKey;
  @NotNull
  @Pattern(regexp = "(?=.*\\d{1,50})(?=.*[a-zA-Z]{1,50}).{8,20}$")
  private String afterPassword;
}
