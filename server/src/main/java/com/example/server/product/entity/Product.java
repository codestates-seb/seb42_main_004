package com.example.server.product.entity;

import com.example.server.image.entity.ProductImage;
import com.example.server.mealbox.entity.MealboxProduct;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_ID")
    private Long id;
    @Column(name = "PRODUCT_NAME", nullable = false)
    private String name;
    @Column(nullable = false)
    private int weight;
    @Column(nullable = false)
    private int kcal;
    @Column(nullable = false)
    private int price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<MealboxProduct> mealboxProducts;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter
    private ProductImage image;

    public void addMealboxProduct(MealboxProduct mealboxProduct){
        if(mealboxProducts == null){
            mealboxProducts = new ArrayList<>();
        }
        mealboxProducts.add(mealboxProduct);
    }

    public void patchProduct(String name, int weight, int kcal, int price){
        this.name = name;
        this.weight = weight;
        this.kcal = kcal;
        this.price = price;
    }

}