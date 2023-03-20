package com.example.server.user.data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
  @NotNull
  private String zipCode;
  @NotNull
  @Column(name = "address_simple")
  private String simpleAddress;
  @NotNull
  @Column(name = "address_detail")
  private String detailAddress;

}
