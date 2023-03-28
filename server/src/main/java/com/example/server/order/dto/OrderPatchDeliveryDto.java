package com.example.server.order.dto;

import javax.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class OrderPatchDeliveryDto {
  private String addressee;
  @Pattern(regexp = "^\\d{5,6}$")
  private String zipCode;
  private String simpleAddress;
  private String detailAddress;
  @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$")
  private String phoneNumber;
}
