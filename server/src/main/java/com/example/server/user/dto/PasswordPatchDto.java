package com.example.server.user.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class PasswordPatchDto {

  private String password;
  private String afterPassword;

}
