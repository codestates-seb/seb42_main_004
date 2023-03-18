package com.example.server.user.entity;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;
import static lombok.AccessLevel.PROTECTED;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.cart.entity.Cart;
import com.example.server.image.entity.UserImage;
import com.example.server.order.entity.Orders;
import com.example.server.user.data.Address;
import com.example.server.user.data.DeliveryInformation;
import com.example.server.user.data.UserStatus;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long id;
  @Setter
  private String email;
  @Setter
  private String password;
  @Setter
  private String name;
  @Column(name = "phone_number")
  @Setter
  private String phoneNumber;
//  @Setter
//  private String address;
  @Setter
  @Embedded
  private Address address;

  @Setter
  @Embedded
  @AttributeOverride(name = "name", column = @Column(name = "addressee"))
  @AttributeOverride(name = "phoneNumber", column = @Column(name = "addresseePhoneNumber"))
  @AttributeOverride(name = "address.zipCode", column = @Column(name = "deliveryZipCode"))
  @AttributeOverride(name = "address.simpleAddress", column = @Column(name = "deliverySimpleAddress"))
  @AttributeOverride(name = "address.detailAddress", column = @Column(name = "deliveryDetailsAddress"))
  private DeliveryInformation deliveryInformation;

  @ElementCollection(fetch = EAGER)
  @Setter
  @Builder.Default
  private List<String> roles = new ArrayList<>();
  @Enumerated(STRING)
  @Default
  @Setter
  private UserStatus status = UserStatus.USER_TMP;
  //연관관계


  public User(User user) {
    this.id = user.getId();
    this.email = user.getEmail();
    this.password = user.getPassword();
    this.name = user.getName();
    this.roles = user.getRoles();
  }

  //이메일 인증이 되었는지 확인하는 키
  @Default
  @Setter
  private String mailKey = "";

  @OneToOne(mappedBy = "user")
  private UserImage image;

  @OneToOne(mappedBy = "user")
  private Cart cart;

  @OneToMany(mappedBy = "user")
  @Builder.Default
  private List<Orders> orders = new ArrayList();

  public void addOrders(Orders orders) {
    this.orders.add(orders);
    if(orders.getUser() != this) {
      orders.addUser(this);
    }
  }

}
