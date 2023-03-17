package com.example.server.order.dto;

import com.example.server.order.entity.OrdersMealbox;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Setter;

@Setter
public class OrderResponseDto { //주문 목록 조회시 필요
  private String username;
  private String orderNumber;
  private LocalDateTime createdAt;
  private LocalDate deliveryDate;
  private String orderStatus;
  private List<OrderMealboxResponseDto> mealboxes;
}
