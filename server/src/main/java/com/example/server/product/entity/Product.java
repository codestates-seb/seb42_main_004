package com.example.server.product.entity;

import com.example.server.image.entity.Image;
import com.example.server.image.entity.ProductImage;
import com.example.server.mealbox.entity.MealboxProduct;
import lombok.*;

import javax.persistence.*;
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
    @Setter
    @Column(name = "PRODUCT_NAME", nullable = false)
    private String name;
    @Setter
    @Column(nullable = false)
    private int unitWeight;
    @Setter
    @Column(nullable = false)
    private int unitKcal;
    @Setter
    @Column(nullable = false)
    private int unitPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToOne(mappedBy = "product")
    private ProductImage image;

    public void addMealboxProduct(MealboxProduct mealboxProduct){
        mealboxProducts.add(mealboxProduct);
    }

}
