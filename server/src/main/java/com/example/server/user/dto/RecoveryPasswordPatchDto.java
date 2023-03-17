package com.example.server.user.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RecoveryPasswordPatchDto {
  private String email;
  private String mailKey;
  private String afterPassword;
}
