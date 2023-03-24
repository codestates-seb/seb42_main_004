package com.example.server.mealbox.entity;

import com.example.server.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MealboxProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_PRODUCT_ID")
    private Long id;

    @Column(nullable = false)
    private int quantity;

    /* ####### JPA 매핑 ####### */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name="MEALBOX_ID")
    private Mealbox mealbox;

    /* ####### 편의 메서드 ####### */

    public static void makeMealboxProduct(int quantity, Product product, Mealbox mealbox) {
        MealboxProduct mealboxProduct =
                MealboxProduct.builder().quantity(quantity).product(product).mealbox(mealbox).build();
        mealbox.addMealboxProduct(mealboxProduct);
        product.addMealboxProduct(mealboxProduct);
    }
}