package com.example.server.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@AllArgsConstructor
public class UserPatchDto {
  private Long id;
  @Setter
  private String password;
  private String name;
  private String phoneNumber;
  private String address;
  //TODO 이미지 추가해야함
//  private Image image;

}
