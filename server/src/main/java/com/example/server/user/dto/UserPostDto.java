package com.example.server.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPostDto {

  private String email;
  private String password;
  private String name;

}
