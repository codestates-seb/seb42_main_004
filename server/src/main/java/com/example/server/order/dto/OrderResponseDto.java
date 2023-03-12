package com.example.server.order.dto;

import com.example.server.order.entity.OrdersMealbox;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Setter;

@Setter
public class OrderResponseDto {
  private String username;
  private String orderNumber;
  private LocalDateTime createdAt;
  private String orderStatus;
//  private List<OrdersMealboxResponseDto> mealboxes; // 추후 만들어져야함
}
