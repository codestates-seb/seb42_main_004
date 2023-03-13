package com.example.server.cart.entity;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Cart extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long cartId;

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