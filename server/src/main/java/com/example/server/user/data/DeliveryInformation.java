package com.example.server.user.data;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeliveryInformation {
  private String name;
  private String phoneNumber;
  @Embedded
  private Address address;

}
