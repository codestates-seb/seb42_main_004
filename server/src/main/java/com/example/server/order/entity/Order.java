package com.example.server.order.entity;

import com.example.server.order.data.OrderStatus;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @Column(nullable = false, unique = true)
  private String orderNumber;

  private int totalPrice;

  private LocalDateTime deliveryDate;

  private String addressee;

  private String address;

  private String phoneNumber;

  private OrderStatus status;



  // User 연관관계 매핑 필요 아직 User 엔티티가 없음
  // OrderMealBoxy 연관관계 매핑 필요
  // createdAt 추후 만들 필요있음

}