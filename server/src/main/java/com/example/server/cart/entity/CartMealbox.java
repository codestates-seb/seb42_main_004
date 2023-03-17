package com.example.server.cart.entity;

import com.example.server.mealbox.entity.Mealbox;

import javax.persistence.*;

import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CartMealbox {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long cartMealboxId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cart_id")
  private Cart cart;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "mealbox_id")
  private Mealbox mealbox;

  @Column(nullable = false)
  private int quantity;

  public void setCart(Cart cart) {
    this.cart = cart;
    if (!cart.getCartMealboxes().contains(this)) {
      cart.getCartMealboxes().add(this);
    }
  }
}

