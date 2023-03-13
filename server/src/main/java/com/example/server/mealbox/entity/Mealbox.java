package com.example.server.mealbox.entity;

import com.example.server.image.entity.Image;
import com.example.server.image.entity.MealboxImage;
import com.example.server.order.entity.OrdersMealbox;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_ID")
    private Long id;

    private String mealboxName;

    private String details;

    private int totalPrice;

    private int totalKcal;

    private int totalWeight;

    private boolean createdByAdmin;


    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<MealboxProduct> mealboxProducts;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<OrdersMealbox> ordersMealboxes;

    @OneToOne
    @JoinColumn(name = "MEALBOX_IMAGE_ID")
    private MealboxImage image;

    @Builder
    public Mealbox(String mealboxName, String details, int totalPrice, int totalKcal, int totalWeight,
                   boolean createdByAdmin) {
        this.mealboxName = mealboxName;
        this.details = details;
        this.totalPrice = totalPrice;
        this.totalKcal = totalKcal;
        this.totalWeight = totalWeight;
        this.createdByAdmin = createdByAdmin;
    }

    public void changeMealbox(String mealboxName, String details, int totalPrice, int totalKcal, int totalWeight) {
        this.mealboxName = mealboxName;
        this.details = details;
        this.totalPrice = totalPrice;
        this.totalKcal = totalKcal;
        this. totalWeight = totalWeight;
    }

    public void addMealboxProduct(MealboxProduct mealboxProduct) {
        mealboxProducts.add(mealboxProduct);
    }

    public void addOrderMealbox(OrdersMealbox ordersMealbox) {
        ordersMealboxes.add(ordersMealbox);
    }
}
