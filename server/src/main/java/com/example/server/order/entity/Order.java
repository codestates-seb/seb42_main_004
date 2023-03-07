package com.example.server.order.entity;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.order.data.OrderStatus;
import com.example.server.orderMealbox.entity.OrderMealbox;
import com.example.server.user.entity.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Order extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @Column(nullable = false, unique = true)
  private String orderNumber; // 주문 번호

  private int totalPrice; // 주문 총액

  private LocalDateTime deliveryDate; // 지정 배송일

  private String addressee; // 받는 사람

  private String address; // 받는 주소

  private String phoneNumber; // 수령인 전화번호

  private OrderStatus status; // 주문 상태

  @ManyToOne
  @JoinColumn(name = "USER_ID")
  private User user;

  public void addUser(User user) {
    this.user = user;
  }

  @OneToMany(mappedBy = "order")
  private List<OrderMealbox> orderMealboxes = new ArrayList<>();


}