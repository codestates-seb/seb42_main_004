package com.example.server.order.data;

import lombok.Getter;

public enum OrderStatus {
  ORDER_COMPLETED(1, "주문완료"),
  ORDER_CANCELED(2, "주문취소"),
  DELIVERY_IN_PROGRESS(3, "배송중"),
  DELIVERY_COMPLETED(4, "배송완료"),
  REFUND_APPLIED(5, "환불대기중"),
  REFUNDED(6, "환불완료");

  @Getter
  private int index;
  @Getter
  private String status;

  OrderStatus(int index, String status) {
    this.index = index;
    this.status = status;
  }
}
