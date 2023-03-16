package com.example.server.order.dto;

import lombok.Setter;

@Setter
public class OrderPageResponseDto { // 결제창에서 넘겨줄 값
  private String orderNumber; // 주문번호
  private String userZipCode; // 주문자 우편번호
  private String userSimpleAddress; // 주문자 주소
  private String userDetailAddress; // 주문자 상세주소
  private String username; // 주문자 이름
  private String userPhoneNumber; // 주문자 연락처
  private String addressee;  // 수신자 이름
  private String deliveryZipCode; // 수신자 우편번호
  private String deliverySimpleAddress; // 수신자 주소
  private String deliveryDetailAddress; // 수신자 상세주소
  private int totalPrice; // 총 결제금액
  private String email; // 주문자 이메일
}
