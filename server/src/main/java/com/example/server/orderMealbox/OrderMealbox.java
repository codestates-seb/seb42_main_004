package com.example.server.orderMealbox;

import com.example.server.mealbox.Mealbox;
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
    private long orderMealboxId;

    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealbox_id")
    private Mealbox mealbox;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "order_id")
//    private Order order;
}