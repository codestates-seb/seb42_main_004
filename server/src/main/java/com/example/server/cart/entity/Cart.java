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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long cartId;
  @Column(nullable = false)
  private int totalPrice;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "cart")
  private List<CartMealbox> cartMealboxes = new ArrayList<>();

  public void setCartMealbox(CartMealbox cartMealbox) {
    cartMealboxes.add(cartMealbox);
    if(cartMealbox.getCart() != this) {
      cartMealbox.setCart(this);
    }
  }
}
