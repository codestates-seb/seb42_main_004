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

  @Column(nullable = false)
  private int quantity;

  /* ####### JPA 매핑 ####### */

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cart_id")
  private Cart cart;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "mealbox_id")
  private Mealbox mealbox;

  /* ####### 편의 메서드 ####### */

  public static CartMealbox makeCartMealbox(Cart cart, Mealbox mealbox, int quantity) {
    CartMealbox cartMealbox = CartMealbox.builder()
            .cart(cart).mealbox(mealbox).quantity(quantity).build();
    mealbox.addCartMealbox(cartMealbox);
//    cart.addCartMealbox(cartMealbox);
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

  public void plusQuantity(int quantity){
    this.quantity = this.getQuantity() + quantity;
  }
}

