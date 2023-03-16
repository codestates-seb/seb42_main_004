package com.example.server.user.data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
  private String zipCode;
  @Column(name = "address_simple")
  private String simpleAddress;
  @Column(name = "address_detail")
  private String detail;

}
