package com.example.server.user.data;

import static lombok.AccessLevel.PROTECTED;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = PROTECTED)
public class Address {
  @NotNull
  @Default
  private String zipCode = "";
  @NotNull
  @Column(name = "address_simple")
  @Default
  private String simpleAddress= "";
  @NotNull
  @Column(name = "address_detail")
  @Default
  private String detailAddress= "";

}
