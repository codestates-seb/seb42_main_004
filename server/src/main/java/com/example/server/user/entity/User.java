package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.image.Image;
import com.example.server.user.data.UserRole;
import com.example.server.user.data.UserStatus;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
//@NoArgsConstructor(access = PROTECTED)
//@AllArgsConstructor(access = PROTECTED)
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private long userId;
  private String email;
  private String password;
  private String name;
  @Column(name = "phone_number")
  private String phoneNumber;
  private String address;
  @Enumerated(STRING)
  @Default
  @Setter
  private UserRole role = UserRole.ROLE_USER;
  @Enumerated(STRING)
  @Default
  @Setter
  private UserStatus status = UserStatus.USER_TMP;
  //연관관계


// 이미지 객체 구현시 풀기
//  private Image image;

  //이메일 인증이 되었는지 확인하는 키
  @Default
  private String mailKey;

  @Embedded
  private Image image;


}
