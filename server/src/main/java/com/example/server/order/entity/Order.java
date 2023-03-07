package com.example.server.order.entity;

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

  public enum OrderStatus {
    ORDER_COMPLETED("주문완료"),
    ORDER_CANCELED("주문취소"),
    DELIVERY_IN_PROGRESS("배송중"),
    DELIVERY_COMPLETED("배송완료"),
    REFUND_APPLIED("환불대기중"),
    REFUNDED("환불완료");

    @Getter
    private String status;

    OrderStatus(String status) {
      this.status = status;
    }
  }

  // User 연관관계 매핑 필요 아직 User 엔티티가 없음
  // OrderMealBoxy 연관관계 매핑 필요
  // createdAt 추후 만들 필요있음

}