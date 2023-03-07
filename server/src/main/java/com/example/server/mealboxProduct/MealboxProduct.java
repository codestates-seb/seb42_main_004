package com.example.server.mealboxProduct;

import com.example.server.mealbox.Mealbox;
import com.example.server.product.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MealboxProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long mealboxProductId;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mealbox_id")
    private Mealbox mealbox;
}
