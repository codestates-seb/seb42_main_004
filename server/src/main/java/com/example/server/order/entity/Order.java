package com.example.server.order.entity;

import com.example.server.baseEntity.BaseEntity;
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


  // User 연관관계 매핑 필요 아직 User 엔티티가 없음
  // OrderMealBoxy 연관관계 매핑 필요
  // createdAt 추후 만들 필요있음

}