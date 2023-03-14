package com.example.server.mealbox.entity;

import com.example.server.image.entity.Image;
import com.example.server.image.entity.MealboxImage;
import com.example.server.order.entity.OrdersMealbox;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Mealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_ID")
    private Long id;
    @Column(name = "MEALBOX_NAME", nullable = false)
    @Setter
    private String name;
    @Column(nullable = false)
    @Setter
    private int totalPrice;
    @Column(nullable = false)
    @Setter
    private int totalKcal;
    @Column(nullable = false)
    @Setter
    private int totalWeight;
    @Column(nullable = false)
    private boolean createdByAdmin;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<OrdersMealbox> ordersMealboxes;

    @OneToOne(mappedBy = "mealbox")
    private MealboxImage image;

    public void addMealboxProduct(MealboxProduct mealboxProduct) {
        mealboxProducts.add(mealboxProduct);
    }

    public void addOrderMealbox(OrdersMealbox ordersMealbox) {
        ordersMealboxes.add(ordersMealbox);
    }
}
