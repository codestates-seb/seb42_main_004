package com.example.server.order.entity;

import com.example.server.mealbox.entity.Mealbox;
import java.util.List;
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
    private String name;
    @Setter
    private int quantity;
    @Setter
    private int price;
    @Setter
    private int kcal;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealbox_id")
    private Mealbox mealbox;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id")
    private Orders orders;

    @OneToMany(mappedBy = "ordersMealbox")
    private List<OrdersProduct> ordersProducts;


    @Builder
    public OrdersMealbox(int quantity, Mealbox mealbox, Orders orders) {
        this.quantity = quantity;
        this.mealbox = mealbox;
        this.orders = orders;
    }

    @Builder
    public OrdersMealbox(int quantity, Mealbox mealbox, String name) {
        this.quantity = quantity;
        this.mealbox = mealbox;
        this.name = name;
    }

    public void addOrders(Orders orders) {
        this.orders = orders;
        if(!orders.getOrdersMealboxes().contains(this)) {
            orders.addOrdersMealbox(this);
        }
    }

    public void addOrdersProduct(OrdersProduct ordersProduct) {
        this.ordersProducts.add(ordersProduct);
        if (ordersProduct.getOrdersMealbox() != this) {
            ordersProduct.addOrdersMealbox(this);
        }
    }
}