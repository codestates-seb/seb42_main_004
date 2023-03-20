package com.example.server.mealbox.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MealboxProductResponseDto {  // 주문 내역창에 재료 이름, 수량 전송
  private String productName;
  private int productQuantity;
}
