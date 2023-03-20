package com.example.server.user.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class PasswordPatchDto {

  @NotNull
  @Pattern(regexp = "/(?=.*\\d{1,50})(?=.*[a-zA-Z]{1,50}).{8,20}$/")
  private String password;
  @NotNull
  @Pattern(regexp = "/(?=.*\\d{1,50})(?=.*[a-zA-Z]{1,50}).{8,20}$/")
  private String afterPassword;

}
