package com.example.server.mealbox.entity;

import com.example.server.cart.entity.CartMealbox;
import com.example.server.image.entity.MealboxImage;
import com.example.server.mealboxSet.entity.MealboxSet;
import com.example.server.mealboxSet.entity.MealboxSetter;
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
    @Enumerated(EnumType.STRING)
    private MealboxInfo mealboxInfo;
    @Column(nullable = false)
    @Builder.Default
    private boolean forSale = true;

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

    /* ####### JPA 매핑 ####### */

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MealboxProduct> mealboxProducts = new ArrayList<>();

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.ALL)
    @Builder.Default
    private List<OrdersMealbox> ordersMealboxes = new ArrayList<>();

    @OneToMany(mappedBy = "mealbox", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<CartMealbox> cartMealboxes = new ArrayList<>();

    @OneToOne(mappedBy = "mealbox", cascade = CascadeType.ALL, orphanRemoval = true)
    @Setter
    private MealboxImage image;

    @OneToMany(mappedBy = "mealbox", orphanRemoval = true)
    @Builder.Default
    private List<MealboxSetter> mealboxSetters = new ArrayList<>();

    /* ####### 편의 메서드 ####### */

    public void addMealboxProduct(MealboxProduct mealboxProduct) {
        mealboxProducts.add(mealboxProduct);
    }

    public void addCartMealbox(CartMealbox cartMealbox) {
        cartMealboxes.add(cartMealbox);
    }

    public void addMealboxSetter(MealboxSetter mealboxSetter){
        mealboxSetters.add(mealboxSetter);
    }

    public void patchMealbox(Mealbox mealboxPatcher){
        this.name = mealboxPatcher.getName();
        this.price = mealboxPatcher.getPrice();
        this.kcal = mealboxPatcher.getKcal();
        this.weight = mealboxPatcher.getWeight();
        this.mealboxProducts.clear();
    }

    public void calculateDetails() {
        this.weight = mealboxProducts.stream().mapToInt(mealboxProduct->
                mealboxProduct.getProduct().getWeight()*mealboxProduct.getQuantity()).sum();
        this.price = mealboxProducts.stream().mapToInt(mealboxProduct->
                mealboxProduct.getProduct().getPrice()*mealboxProduct.getQuantity()).sum();
        this.kcal = mealboxProducts.stream().mapToInt(mealboxProduct->
                mealboxProduct.getProduct().getKcal()*mealboxProduct.getQuantity()).sum();
    }

    public void deleteMealbox() {
        this.forSale = false;
    }
}
