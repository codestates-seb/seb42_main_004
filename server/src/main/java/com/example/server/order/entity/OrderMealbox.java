package com.example.server.order.entity;

import com.example.server.image.Image;
import com.example.server.mealbox.entity.Mealbox;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class OrderMealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderMealboxId;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealbox_id")
    private Mealbox mealbox;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
}