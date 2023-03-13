package com.example.server.mealbox.entity;

import com.example.server.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MealboxProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_PRODUCT_ID")
    private Long id;

    @Setter
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mealbox_id")
    private Mealbox mealbox;

    @Builder
    public MealboxProduct(int quantity, Product product, Mealbox mealbox) {
        this.quantity = quantity;
        this.product = product;
        this.mealbox = mealbox;
    }
}
