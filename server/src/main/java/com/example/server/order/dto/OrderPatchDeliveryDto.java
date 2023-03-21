package com.example.server.order.dto;

import lombok.Getter;

@Getter
public class OrderPatchDeliveryDto {
  private String addressee;
  private String zipCode;
  private String simpleAddress;
  private String detailAddress;
  private String phoneNumber;
}
