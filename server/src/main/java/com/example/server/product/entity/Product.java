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

    /* ####### JPA 매핑 ####### */

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<MealboxProduct> mealboxProducts = new ArrayList<>();

    @OneToOne(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter
    private ProductImage image;

    /* ####### 편의 메서드 ####### */

    public void addMealboxProduct(MealboxProduct mealboxProduct){
        mealboxProducts.add(mealboxProduct);
    }

    public void patchProduct(Product productPatcher){
        this.name = productPatcher.getName();
        this.weight = productPatcher.getWeight();
        this.kcal = productPatcher.getKcal();
        this.price = productPatcher.getPrice();
    }
}