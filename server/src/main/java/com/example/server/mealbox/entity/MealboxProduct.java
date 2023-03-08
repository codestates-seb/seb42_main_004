package com.example.server.mealbox.entity;

import com.example.server.image.Image;
import com.example.server.mealbox.entity.Mealbox;
import com.example.server.product.entity.Product;
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
    private Long mealboxProductId;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mealbox_id")
    private Mealbox mealbox;

}