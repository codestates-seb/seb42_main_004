package com.example.server.order.data;

import lombok.Getter;

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
