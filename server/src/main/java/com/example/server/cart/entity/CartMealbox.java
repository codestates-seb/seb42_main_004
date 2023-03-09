package com.example.server.cart.entity;

import com.example.server.mealbox.entity.Mealbox;
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

@Entity
@Setter
@Getter
@NoArgsConstructor
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

  private int quantity;

  public void setCart(Cart cart) {
    this.cart = cart;
    if (!cart.getCartMealboxes().contains(this)) {
      cart.getCartMealboxes().add(this);
    }
  }
}

