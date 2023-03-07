package com.example.server.product;

import com.example.server.mealboxProduct.MealboxProduct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;
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
}
