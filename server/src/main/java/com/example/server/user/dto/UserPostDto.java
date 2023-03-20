package com.example.server.user.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPostDto {

  @NotNull
  private String email;
  private String password;
  private String name;

}
