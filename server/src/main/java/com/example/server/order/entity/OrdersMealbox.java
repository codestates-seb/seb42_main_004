package com.example.server.order.entity;

import com.example.server.mealbox.entity.Mealbox;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class OrdersMealbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDERS_MEALBOX_ID")
    private Long id;

    @Setter
    private int quantity;

    @Setter
    private int price;

    @Setter
    private int kcal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealbox_id")
    private Mealbox mealbox;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id")
    private Orders orders;


    @Builder
    public OrdersMealbox(int quantity, Mealbox mealbox, Orders orders) {
        this.quantity = quantity;
        this.mealbox = mealbox;
        this.orders = orders;
    }

    @Builder
    public OrdersMealbox(int quantity, Mealbox mealbox) {
        this.quantity = quantity;
        this.mealbox = mealbox;
    }

    public void addOrders(Orders orders) {
        this.orders = orders;
        if(!orders.getOrdersMealboxes().contains(this)) {
            orders.addOrdersMealbox(this);
        }
    }
}