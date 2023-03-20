package com.example.server.user.dto;

import com.example.server.user.data.Address;
import com.example.server.user.data.DeliveryInformation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class UserPatchDto {
  private Long id;
  private String name;
  private String phoneNumber;
  private Address address;
  private DeliveryInformation deliveryInformation;
}
