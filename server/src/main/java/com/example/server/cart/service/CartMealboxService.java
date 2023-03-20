package com.example.server.cart.service;

import com.example.server.cart.entity.CartMealbox;
import com.example.server.cart.exception.CartMealboxException;
import com.example.server.cart.repository.CartMealboxRepository;
import com.example.server.exception.BusinessLogicException;
import java.util.List;
import java.util.Optional;
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

  public void deleteCartMealboxAfterPayment(List<Long> cartMealboxIds) {
    cartMealboxIds.stream().forEach(id -> {
      CartMealbox cartMealbox = findCartMealbox(id);
      cartMealboxRepository.delete(cartMealbox);
    });
  }

  public void changeQuantity(Long cartMealboxId, int quantity){
    CartMealbox cartMealbox = findCartMealbox(cartMealboxId);
    cartMealbox.changeQuantity(quantity);
    cartMealboxRepository.save(cartMealbox);
  }
}
