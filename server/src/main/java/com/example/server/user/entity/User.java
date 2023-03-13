package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;

import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PROTECTED;


import com.example.server.baseEntity.BaseEntity;
import com.example.server.cart.entity.Cart;
import com.example.server.image.entity.Image;
import com.example.server.image.entity.UserImage;
import com.example.server.order.entity.Orders;
import com.example.server.user.data.UserRole;
import com.example.server.user.data.UserStatus;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import lombok.*;
import lombok.Builder.Default;

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

  //이메일 인증이 되었는지 확인하는 키
  @Default
  private String mailKey;

  @OneToOne(mappedBy = "user")
  private UserImage image;

  @OneToOne(mappedBy = "user")
  private Cart cart;

  @OneToMany(mappedBy = "user")
  private List<Orders> orders = new ArrayList();

  public void addOrders(Orders orders) {
    this.orders.add(orders);
    if(orders.getUser() != this) {
      orders.addUser(this);
    }
  }

}
