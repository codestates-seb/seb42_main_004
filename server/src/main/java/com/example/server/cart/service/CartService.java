package com.example.server.cart.service;

import com.example.server.cart.entity.Cart;
import com.example.server.cart.entity.CartMealbox;
import com.example.server.cart.exception.CartException;
import com.example.server.cart.repository.CartRepository;
import com.example.server.exception.BusinessLogicException;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.service.MealboxService;
import com.example.server.order.entity.OrdersMealbox;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public void createCartMealboxAndAddMealbox(Cart cart, Long mealboxId){
        CartMealbox cartMealbox = findSameMealboxInCart(cart, mealboxId);
        if(cartMealbox!=null) {
            cartMealboxService.plusOneQuantity(cartMealbox);
        }
        else{
            Mealbox mealbox = mealboxService.findMealboxById(mealboxId);

            cartMealboxService.createCartMealbox(cart, mealbox);

            cart.calculateTotalPrice();
            cartRepository.save(cart);
        }
    }

    public void removeMealboxFromCart(Cart cart, Long cartMealboxId){
        verifyExistsCartMealboxIsInCart(cart, cartMealboxId);

        CartMealbox cartMealbox = cartMealboxService.findCartMealbox(cartMealboxId);
        Mealbox mealbox = cartMealbox.getMealbox();

        //커스텀이면 cartMealbox, mealbox, mealboxProduct까지 다 삭제
        if(mealbox.getMealboxInfo() == Mealbox.MealboxInfo.CUSTOM_MEALBOX){
            List<OrdersMealbox> ordersMealboxes = mealbox.getOrdersMealboxes();
            for(OrdersMealbox ordersMealbox : ordersMealboxes) {
                ordersMealbox.setMealbox(null);
            }
            mealboxService.deleteMealbox(mealbox.getId());
            mealbox.getCartMealboxes().forEach(eachCartMealbox ->
                    cart.getCartMealboxes().remove(eachCartMealbox));
        } //커스텀이 아니면 cartMealbox만 삭제
        else if (mealbox.getMealboxInfo() != Mealbox.MealboxInfo.CUSTOM_MEALBOX) {
            cartMealboxService.deleteCartMealbox(cartMealbox);
            cart.getCartMealboxes().remove(cartMealbox);
        }

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public void changeMealboxQuantity(Cart cart, Long cartMealboxId, int quantity) {
        verifyExistsCartMealboxIsInCart(cart, cartMealboxId);

        cartMealboxService.changeQuantity(cartMealboxId, quantity);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public Cart createMealboxAndAddCart(Cart cart, Mealbox mealbox,
                                        List<MealboxDto.Product> mealboxDtoProducts){
        mealboxService.createMealboxAndMealboxProduct(mealbox, mealboxDtoProducts);

        cartMealboxService.createCartMealbox(cart, mealbox);

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    /* ####### private 메서드 ####### */

    private void verifyExistsCartMealboxIsInCart(Cart cart, Long cartMealboxId) {
        boolean isInCart = cart.getCartMealboxes().stream()
                .anyMatch(cartMealbox->cartMealbox.getId()==cartMealboxId);
        if(isInCart == false){
            throw new BusinessLogicException(CartException.CARTMEALBOX_NOT_IN_CART);
        }
    }

    //카트에 이미 있는 밀박스인지 조사하기 -> 리턴 : 해당 카트밀박스
    private CartMealbox findSameMealboxInCart(Cart cart, Long mealboxId){
        List<CartMealbox> cartMealboxList = cart.getCartMealboxes().stream().map(cartMealbox -> {
                    if (cartMealbox.getMealbox().getId() == mealboxId) {
                        return cartMealbox;
                    }
                    return null;
                }
        ).filter(Objects::nonNull).collect(Collectors.toList());

        if(cartMealboxList.size()==1){
            return cartMealboxList.get(0);
        }
        return null;
    }
}
