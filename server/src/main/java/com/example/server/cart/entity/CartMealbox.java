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
  @Column(name = "CART_MEALBOX_ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  /* ####### JPA 매핑 ####### */

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cart_id")
  private Cart cart;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "mealbox_id")
  private Mealbox mealbox;

  @Column(nullable = false)
  private int quantity;

  /* ####### 편의 메서드 ####### */

  public static CartMealbox makeCartMealbox(Cart cart, Mealbox mealbox) {
    CartMealbox cartMealbox = CartMealbox.builder()
            .cart(cart).mealbox(mealbox).quantity(1).build();
    mealbox.addCartMealbox(cartMealbox);
    return cartMealbox;
  }

  public void setCart(Cart cart) {
    this.cart = cart;
    if (!cart.getCartMealboxes().contains(this)) {
      cart.getCartMealboxes().add(this);
    }
  }

  public void changeQuantity(int quantity){
    this.quantity = quantity;
  }
}

