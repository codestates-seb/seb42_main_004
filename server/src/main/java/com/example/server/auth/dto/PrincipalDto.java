package com.example.server.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PrincipalDto {

  private Long id;
  private String email;
  private String name;
  @Builder
  public PrincipalDto(Long id, String email, String name) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
