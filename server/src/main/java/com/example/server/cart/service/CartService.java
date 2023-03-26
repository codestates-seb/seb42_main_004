package com.example.server.cart.service;

import com.example.server.cart.dto.CartAllPostDto;
import com.example.server.cart.entity.Cart;
import com.example.server.cart.entity.CartMealbox;
import com.example.server.cart.exception.CartException;
import com.example.server.cart.mapper.CartMapper;
import com.example.server.cart.repository.CartRepository;
import com.example.server.exception.BusinessLogicException;
import com.example.server.mealbox.dto.MealboxDto;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.mealbox.mapper.MealboxMapper;
import com.example.server.mealbox.service.MealboxService;
import com.example.server.order.entity.OrdersMealbox;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartMealboxService cartMealboxService;
    private final MealboxService mealboxService;
    private final MealboxMapper mealboxMapper;


    public void createCartMealboxAndAddMealbox(Cart cart, Long mealboxId){
        createCartMealbox(cart, mealboxId, 1);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public void createCustomMealboxAndAddCart(Cart cart, Mealbox mealbox,
                                        List<MealboxDto.Product> mealboxDtoProducts){
        createCustomMealboxAndCartMealbox(cart, mealbox, mealboxDtoProducts,1);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }


    public void addAllMealboxes(Cart cart, List<CartAllPostDto.CustomMealboxDto> customMealboxDtos,
                                List<CartAllPostDto.AdminMadeMealboxDto> adminMadeMealboxDtos) {
        customMealboxDtos.forEach(customMealboxDto ->
                createCustomMealboxAndCartMealbox(cart,
                        mealboxMapper.mealboxDtoToMealbox(customMealboxDto.getMealbox(),
                                Mealbox.MealboxInfo.CUSTOM_MEALBOX),
                        customMealboxDto.getMealbox().getProducts(),
                        customMealboxDto.getQuantity()));

        adminMadeMealboxDtos.forEach(adminMadeMealboxDto ->
                createCartMealbox(cart,
                        adminMadeMealboxDto.getMealboxId(),
                        adminMadeMealboxDto.getQuantity()));

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    //주문자가 카트에서 밀박스를 직접 삭제
    public void removeMealboxFromCart(Cart cart, Long cartMealboxId){
        verifyExistsCartMealboxIsInCart(cart, cartMealboxId);

        CartMealbox cartMealbox = cartMealboxService.findCartMealbox(cartMealboxId);

        cart.getCartMealboxes().remove(cartMealbox);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public void changeMealboxQuantity(Cart cart, Long cartMealboxId, int quantity) {
        verifyExistsCartMealboxIsInCart(cart, cartMealboxId);

        cartMealboxService.changeQuantity(cartMealboxId, quantity);

        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    public void refreshTotalPrice(Cart cart) {
        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }

    /* ####### private 메서드 ####### */

    private void createCartMealbox(Cart cart, Long mealboxId, int quantity) {
        CartMealbox cartMealbox = findSameMealboxInCart(cart, mealboxId);
        if(cartMealbox!=null) {
            cartMealboxService.plusQuantity(cartMealbox, quantity);
        }
        else{
            Mealbox mealbox = mealboxService.findMealboxById(mealboxId);

            cartMealboxService.createCartMealbox(cart, mealbox, quantity);
        }
    }

    private void createCustomMealboxAndCartMealbox(Cart cart, Mealbox mealbox,
                                                   List<MealboxDto.Product> mealboxDtoProducts,int quantity) {
        mealboxService.createMealboxAndMealboxProduct(mealbox, mealboxDtoProducts);

        cartMealboxService.createCartMealbox(cart, mealbox,quantity);
    }

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
