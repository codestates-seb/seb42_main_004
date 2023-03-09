package com.example.server.order.entity;

import com.example.server.image.Image;
import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderMealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderMealboxId;

    @Setter
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealbox_id")
    private Mealbox mealbox;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Builder
    public OrderMealbox(int quantity, Mealbox mealbox, Order order) {
        this.quantity = quantity;
        this.mealbox = mealbox;
        this.order = order;
    }
}