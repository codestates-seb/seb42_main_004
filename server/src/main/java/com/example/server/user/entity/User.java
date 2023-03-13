package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PROTECTED;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.image.Image;
import com.example.server.order.entity.Order;
import com.example.server.user.data.UserStatus;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
  @Setter
  private String password;
  @Setter
  private String name;
  @Column(name = "phone_number")
  @Setter
  private String phoneNumber;
  @Setter
  private String address;
  @ElementCollection(fetch = EAGER)
  @Setter
  @Builder.Default
  private List<String> roles = new ArrayList<>();
  @Enumerated(STRING)
  @Default
  @Setter
  private UserStatus status = UserStatus.USER_TMP;
  //연관관계


// 이미지 객체 구현시 풀기
  @OneToOne
  @JoinColumn(name = "image_id")
  private Image image;

//  @OneToOne
//  @JoinColumn(name = "cart_id")
//  private Cart cart;

  @OneToMany(mappedBy = "user")
  private List<Order> orders = new ArrayList<>();


  //이메일 인증이 되었는지 확인하는 키

  private String mailKey;


}
