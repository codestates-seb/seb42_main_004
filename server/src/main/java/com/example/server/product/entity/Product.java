package com.example.server.product.entity;

import com.example.server.image.entity.Image;
import com.example.server.image.entity.ProductImage;
import com.example.server.mealbox.entity.MealboxProduct;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor // 더미데이터를 위한 것 -> 삭제요망
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_ID")
    private Long id;
    private String productName;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToOne
    @JoinColumn(name = "PRODUCT_IMAGE_ID")
    private ProductImage image;

    @Builder
    public Product(String productName, String details, int unitWeight, int unitKcal, int unitPrice) {
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
