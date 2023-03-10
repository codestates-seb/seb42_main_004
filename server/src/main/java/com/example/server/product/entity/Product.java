package com.example.server.product.entity;

import com.example.server.image.Image;
import com.example.server.mealbox.entity.MealboxProduct;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor // 더미데이터를 위한 것 -> 삭제요망
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String productName;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;
    @Setter
    @Embedded
    private Image image;

    @Builder
    public Product(Long productId, String productName, String details, int unitWeight, int unitKcal, int unitPrice) {
        this.productId = productId;
        this.productName = productName;
        this.details = details;
        this.unitWeight = unitWeight;
        this.unitKcal = unitKcal;
        this.unitPrice = unitPrice;
    }

    public void addMealboxProduct(MealboxProduct mealboxProduct){
        mealboxProducts.add(mealboxProduct);
    }

}
