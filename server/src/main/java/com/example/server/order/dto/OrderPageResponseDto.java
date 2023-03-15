package com.example.server.order.dto;

import lombok.Setter;

@Setter
public class OrderPageResponseDto {
  private String orderNumber;
  private String userAddress; // 주문자 주소
  private String username; // 주문자 이름
  private String userPhoneNumber; // 주문자 연락처
  private int totalPrice; // 총 결제금액
  private String email; // 주문자 이메일
}
