package com.example.server.order.entity;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.order.data.OrderStatus;
import com.example.server.user.entity.User;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Orders extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  @Column(nullable = false, unique = true)
  private String ordersNumber; // 주문 번호

  private int totalPrice; // 주문 총액

  private LocalDateTime deliveryDate; // 지정 배송일

  private String addressee; // 받는 사람

  private String address; // 받는 주소

  private String phoneNumber; // 수령인 전화번호

  private OrderStatus status = OrderStatus.ORDER_COMPLETED; // 주문 상태

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  private User user;

  public void addUser(User user) {
    this.user = user;
    if (!user.getOrders().contains(this)) {
      user.addOrders(this);
    }
  }

  @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
  private List<OrdersMealbox> ordersMealboxes = new ArrayList<>();

  public void addOrdersMealbox (OrdersMealbox ordersMealbox) {
    ordersMealboxes.add(ordersMealbox);
    if(ordersMealbox.getOrders() != this) {
      ordersMealbox.addOrders(this);
    }
  }

  public void applyRefund() {
    this.status = OrderStatus.REFUND_APPLIED;
  }
}