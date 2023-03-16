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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="MEALBOX_ID")
    private Mealbox mealbox;

    public MealboxProduct(int quantity, Product product, Mealbox mealbox) {
        this.quantity = quantity;
        this.product = product;
        this.mealbox = mealbox;
        product.addMealboxProduct(this);
        mealbox.addMealboxProduct(this);
    }

    public void changeQuantity(int quantity){
        this.quantity = quantity;
    }
}