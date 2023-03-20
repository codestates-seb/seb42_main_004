package com.example.server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPostDto {

  @NotNull
  @Email
  private String email;
  @NotNull
  @Pattern(regexp = "/(?=.*\\d{1,50})(?=.*[a-zA-Z]{1,50}).{8,20}$/")
  private String password;
  @NotNull
  @Size(min = 2, max = 10)
  private String name;

}
