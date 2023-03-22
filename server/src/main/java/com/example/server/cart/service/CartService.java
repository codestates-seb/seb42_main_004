package com.example.server.cart.service;

import com.example.server.cart.entity.Cart;
import com.example.server.cart.entity.CartMealbox;
import com.example.server.cart.exception.CartException;
import com.example.server.cart.repository.CartMealboxRepository;
import com.example.server.cart.repository.CartRepository;
import com.example.server.exception.BusinessLogicException;
import com.example.server.mealbox.dto.MealboxPostDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.service.MealboxService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartMealboxService cartMealboxService;
    private final MealboxService mealboxService;


    public CartService(CartRepository cartRepository,
                       CartMealboxService cartMealboxService, MealboxService mealboxService) {
        this.cartRepository = cartRepository;
        this.cartMealboxService = cartMealboxService;
        this.mealboxService = mealboxService;
    }

    public Cart findCartById(Long cartId){
        Optional<Cart> findCart = cartRepository.findById(cartId);
        return findCart.orElseThrow(() -> new BusinessLogicException(CartException.CART_NOT_FOUND));
    }

    public Cart createCartMealboxAndAddMealbox(Cart cart, Long mealboxId){
        Mealbox mealbox = mealboxService.findMealboxById(mealboxId);

        cartMealboxService.createCartMealbox(cart, mealbox);

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public void removeMealboxFromCart(Cart cart, Long cartMealboxId){
        CartMealbox cartMealbox = cartMealboxService.findCartMealbox(cartMealboxId);
        Mealbox mealbox = cartMealbox.getMealbox();

        //커스텀이면 cartMealbox, mealbox, mealboxProduct까지 다 삭제
        if(mealbox.getMealboxInfo() == Mealbox.MealboxInfo.CUSTOM_MEALBOX){
            mealboxService.deleteMealbox(mealbox.getId());
        } //커스텀이 아니면 cartMealbox만 삭제
        else if (mealbox.getMealboxInfo() != Mealbox.MealboxInfo.CUSTOM_MEALBOX) {
            cartMealboxService.deleteCartMealbox(cartMealbox);
        }

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public void changeMealboxQuantity(Cart cart, Long cartMealboxId, int quantity) {
        cartMealboxService.changeQuantity(cartMealboxId, quantity);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public Cart createMealboxAndAddCart(Cart cart, Mealbox mealbox,
                                        List<MealboxPostDto.Product> mealboxDtoProducts){
        mealboxService.createMealboxAndMealboxProduct(mealbox, mealboxDtoProducts, null);

        cartMealboxService.createCartMealbox(cart, mealbox);

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public void refreshTotalPrice(Cart cart) {
        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }
}
