package com.example.server.cart.mapper;

import com.example.server.cart.dto.CartResponseDto;
import com.example.server.cart.dto.MealboxResponseDto;
import com.example.server.cart.entity.Cart;
import com.example.server.mealbox.dto.MealboxProductResponseDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CartMapper {
    default CartResponseDto cartToCartResponseDto(Cart cart) {
        List<MealboxResponseDto> mealboxes = cart.getCartMealboxes().stream().map(cartMealbox ->
                MealboxResponseDto.builder()
                        .cartMealboxId(cartMealbox.getId())
                        .mealboxId(cartMealbox.getMealbox().getId())
                        .name(cartMealbox.getMealbox().getName())
                        .mealboxInfo(cartMealbox.getMealbox().getMealboxInfo())
                        .quantity(cartMealbox.getQuantity())
                        .weight(cartMealbox.getMealbox().getWeight())
                        .kcal(cartMealbox.getMealbox().getKcal())
                        .price(cartMealbox.getMealbox().getPrice())
                        .products(cartMealbox.getMealbox().getMealboxProducts().stream().map(mealboxProduct ->
                                new MealboxProductResponseDto(mealboxProduct.getProduct().getName(),
                                        mealboxProduct.getQuantity())
                        ).collect(Collectors.toList()))
                        .build()
        ).collect(Collectors.toList());

        return new CartResponseDto(cart.getTotalPrice(), mealboxes);
    }
}
