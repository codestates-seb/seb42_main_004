package com.example.server.auth.dto;

import io.jsonwebtoken.Claims;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

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
