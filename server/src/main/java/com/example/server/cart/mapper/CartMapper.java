package com.example.server.cart.mapper;

import com.example.server.cart.dto.CartResponseDto;
import com.example.server.cart.dto.MealboxResponseDto;
import com.example.server.cart.dto.ProductResponseDtoForCart;
import com.example.server.cart.entity.Cart;
import com.example.server.image.entity.ImageInfo;
import com.example.server.mealbox.dto.MealboxProductResponseDto;
import com.example.server.product.dto.ProductResponseDto;
import com.example.server.product.entity.Product;
import com.example.server.product.mapper.ProductMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapper {

    public CartResponseDto cartToCartResponseDto(Cart cart) {
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
                        .products(cartMealbox.getMealbox().getMealboxProducts().stream().map(mealboxProduct ->{
                                    Product product = mealboxProduct.getProduct();
                                    ImageInfo imageInfo = product.getImage().getImageInfo();
                                    return ProductResponseDtoForCart.builder().productId(mealboxProduct.getProduct().getId())
                                            .name(product.getName())
                                            .weight(product.getWeight())
                                            .kcal(product.getKcal())
                                            .price(product.getPrice())
                                            .quantity(mealboxProduct.getQuantity())
                                            .imagePath(imageInfo.getBaseUrl()+imageInfo.getFilePath()+imageInfo.getImageName())
                                            .build();
                                }).collect(Collectors.toList()))
                        .build()
        ).collect(Collectors.toList());

        return new CartResponseDto(cart.getTotalPrice(), mealboxes);
    }
}
