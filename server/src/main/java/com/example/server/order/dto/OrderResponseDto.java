package com.example.server.order.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto { //주문 목록 조회시 필요
  private String username;
  private String orderNumber;
  private LocalDateTime createdAt;
  private LocalDate deliveryDate;
  private String orderStatus;
  private int totalPrice;
  private List<OrderMealboxResponseDto> mealboxes;
}
