package com.example.server.product.entity;

import com.example.server.image.Image;
import com.example.server.mealboxProduct.entity.MealboxProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long productId;
    private String name;
    private String details;
    private int unitWeight;
    private int unitKcal;
    private int unitPrice;
    private Timestamp createdAt;
    private Timestamp modifiedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToOne(fetch = FetchType.LAZY)
    private Image image;
}
