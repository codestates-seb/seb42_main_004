package com.example.server.user.data;

import lombok.Getter;

public enum UserStatus {

  USER_TMP(1, "임시 회원"), USER_ACTiVE(2, "활동 회원"),
  USER_DELETE(3, "탈퇴 회원"), USER_GOOGLE(4, "구글 회원"),
  USER_ADMIN(5,"관리자");

  @Getter
  private int index;
  @Getter
  private String status;

  UserStatus(int index, String status) {
    this.index = index;
    this.status = status;
  }
}
