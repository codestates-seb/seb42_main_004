package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.cart.entity.Cart;
import com.example.server.image.entity.Image;
import com.example.server.image.entity.UserImage;
import com.example.server.user.data.UserRole;
import com.example.server.user.data.UserStatus;

import javax.persistence.*;

import lombok.*;
import lombok.Builder.Default;

@Entity
@Getter
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long id;
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

  //이메일 인증이 되었는지 확인하는 키
  @Default
  private String mailKey;

  @OneToOne
  @JoinColumn(name = "USER_IMAGE_ID")
  private UserImage image;

  @OneToOne(mappedBy = "user")
  private Cart cart;

}
