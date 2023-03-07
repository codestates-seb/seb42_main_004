package com.example.server.mealbox;

import com.example.server.mealboxProduct.MealboxProduct;
import com.example.server.orderMealbox.OrderMealbox;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Mealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long mealboxId;

    private String name;

    private String details;

    private int totalPrice;

    private int totalKcal;

    private int totalWeight;

    private boolean createdByAdmin;

    private Timestamp createdAt;

    private Timestamp modifiedAt;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<OrderMealbox> orderMealboxes;
}
