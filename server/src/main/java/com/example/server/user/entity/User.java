package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.user.data.UserRole;
import com.example.server.user.data.UserStatus;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor(access = PROTECTED)
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long id;
  private String email;
  private String password;
  private String name;
  private String phoneNumber;
  private String address;
  private Long imageId;
  @Enumerated(STRING)
  @Default
  @Setter
  private UserRole role = UserRole.ROLE_USER;
  @Enumerated(STRING)
  @Default
  @Setter
  private UserStatus status = UserStatus.USER_TMP;

  //이메일 인증이 되었는지 확인하는 키
  @Default
  private Boolean mailKey = false;


}
