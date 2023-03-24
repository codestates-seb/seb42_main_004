package com.example.server.cart.service;

import com.example.server.cart.entity.Cart;
import com.example.server.cart.entity.CartMealbox;
import com.example.server.cart.exception.CartMealboxException;
import com.example.server.cart.repository.CartMealboxRepository;
import com.example.server.exception.BusinessLogicException;
import com.example.server.order.entity.Orders;
import java.util.Optional;

import com.example.server.mealbox.entity.Mealbox;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartMealboxService {
  private final CartMealboxRepository cartMealboxRepository;

  public CartMealbox findCartMealbox(long cartMealboxId) {
    Optional<CartMealbox> cartMealbox = cartMealboxRepository.findById(cartMealboxId);
    return cartMealbox.orElseThrow(() -> new BusinessLogicException(
        CartMealboxException.CART_MEALBOX_NOT_FOUND));
  }

  public void deleteCartMealboxAfterPayment(Orders order) {

    order.getCartMealboxIds().stream().forEach(id -> {
      CartMealbox cartMealbox = findCartMealbox(id);
      cartMealboxRepository.delete(cartMealbox);
    });
  }

  public void changeQuantity(Long cartMealboxId, int quantity){
    CartMealbox cartMealbox = findCartMealbox(cartMealboxId);
    cartMealbox.changeQuantity(quantity);
    cartMealboxRepository.save(cartMealbox);
  }

  public void createCartMealbox(Cart cart, Mealbox mealbox){
    CartMealbox cartMealbox = CartMealbox.makeCartMealbox(cart, mealbox);
    cartMealboxRepository.save(cartMealbox);
  }

  public void deleteCartMealbox(CartMealbox cartMealbox){
    cartMealboxRepository.delete(cartMealbox);
  }

  public void plusOneQuantity(CartMealbox cartMealbox){
    cartMealbox.plusOneQuantity();
    cartMealboxRepository.save(cartMealbox);
  }
}
