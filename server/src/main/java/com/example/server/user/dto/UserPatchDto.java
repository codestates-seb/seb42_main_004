package com.example.server.user.dto;

import com.example.server.user.data.Address;
import com.example.server.user.data.DeliveryInformation;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class UserPatchDto {
  @NotNull
  private Long id;
  @Size(min = 2, max = 10)
  private String name;
  @Pattern(regexp = "01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$")
  private String phoneNumber;
  private Address address;
  private DeliveryInformation deliveryInformation;
}
