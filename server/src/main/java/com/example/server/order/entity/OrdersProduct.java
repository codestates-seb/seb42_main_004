package com.example.server.order.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrdersProduct {

  public OrdersProduct(String name, int quantity) {
    this.name = name;
    this.quantity = quantity;
  }
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ORDERS_PRODUCT_ID")
  private Long id;

  private String name;
  private int quantity;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "ORDERS_MEALBOX_ID")
  private OrdersMealbox ordersMealbox;

  public void addOrdersMealbox(OrdersMealbox ordersMealbox) {
    this.ordersMealbox = ordersMealbox;
//    if(!ordersMealbox.getOrdersProducts().contains(this)){
//      ordersMealbox.addOrdersProduct(this);
//    }

  }
}
