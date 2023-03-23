package com.example.server.order.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class OrderPostDto { // 장바구니에서 주문으로 넘어갈 때 필요 (Order 엔티티 생성)
  private List<OrderMealboxPostDto> mealboxes;

}
