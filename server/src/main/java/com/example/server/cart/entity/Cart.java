package com.example.server.cart.entity;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart extends BaseEntity {
  @Id
  @Column(name = "CART_ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @Column(nullable = false)
  @Builder.Default
  @Setter
  private int totalPrice = 0;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "cart", orphanRemoval = true)
  @Builder.Default
  private List<CartMealbox> cartMealboxes = new ArrayList<>();

  public void addCartMealbox(CartMealbox cartMealbox) {
    cartMealboxes.add(cartMealbox);
    if(cartMealbox.getCart() != this) {
      cartMealbox.setCart(this);
    }
  }

  public void calculateTotalPrice() {
    this.totalPrice = this.getCartMealboxes().stream().mapToInt(cartMealbox ->
        cartMealbox.getQuantity() * cartMealbox.getMealbox().getPrice())
            .sum();
  }
}
