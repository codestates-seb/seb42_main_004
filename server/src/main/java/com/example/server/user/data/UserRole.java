package com.example.server.user.data;

import lombok.Getter;

public enum UserRole {
  ROLE_USER(1, "일반 회원"), ROLE_ADMIN(2, "관리자");

  @Getter
  private int index;
  @Getter
  private String desc;

  UserRole(int index, String desc) {
    this.index = index;
    this.desc = desc;
  }
}
