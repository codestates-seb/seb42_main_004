package com.example.server.mealbox.entity;

import com.example.server.image.entity.MealboxImage;
import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.order.entity.OrdersMealbox;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Mealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEALBOX_ID")
    private Long id;
    @Column(name = "MEALBOX_NAME", nullable = false)
    private String name;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private int kcal;
    @Column(nullable = false)
    private int weight;
    @Column(nullable = false)
    private MealboxInfo mealboxInfo;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MealboxProduct> mealboxProducts;

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    private List<OrdersMealbox> ordersMealboxes;

    @OneToOne(mappedBy = "mealbox")
    private MealboxImage image;

    @ManyToOne
    @JoinColumn(name = "MEALBOX_SETS_ID")
    private MealboxSet mealboxSet;

    public void addMealboxProduct(MealboxProduct mealboxProduct) {
        if(mealboxProducts==null){
            mealboxProducts = new ArrayList<>();
        }
        mealboxProducts.add(mealboxProduct);
    }

    public void clearMealboxProducts(){
        mealboxProducts.clear();
    }

    public void addOrderMealbox(OrdersMealbox ordersMealbox) {
        if(ordersMealboxes==null){
            ordersMealboxes = new ArrayList<>();
        }
        ordersMealboxes.add(ordersMealbox);
    }

    public void patchMealbox(String name, int price, int kcal, int weight){
        this.name = name;
        this.price = price;
        this.kcal = kcal;
        this.weight = weight;
        this.mealboxProducts.clear();
    }

    @Getter
    @AllArgsConstructor
    public enum MealboxInfo{
        CUSTOM_MEALBOX("Custom Mealbox"),
        NO_REC_MEALBOX("Not Rec Mealbox"),
        BREAKFAST_REC_MEALBOX("Breakfast Rec Mealbox"),
        LUNCH_REC_MEALBOX("Lunch Rec Mealbox"),
        DINNER_REC_MEALBOX("Dinner Rec Mealbox");
        private String info;
    }
}
