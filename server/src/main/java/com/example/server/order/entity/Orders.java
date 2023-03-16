package com.example.server.order.entity;

import com.example.server.baseEntity.BaseEntity;
import com.example.server.order.data.OrderStatus;
import com.example.server.payment.Entity.PayInfo;
import com.example.server.user.entity.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Orders extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  @Column(nullable = false, unique = true)
  private String orderNumber; // 주문 번호

  private int totalPrice; // 주문 총액

  private LocalDate deliveryDate; // 배송 완료일

  private String addressee; // 받는 사람

  private String zipCode; // 배송 우편번호
  private String simpleAddress; // 배송 주소
  private String detailAddress; // 배송 상세주소
  private String phoneNumber; // 수령인 전화번호

  private OrderStatus status = OrderStatus.NOT_PAID; // 주문 상태

  @ElementCollection(fetch = FetchType.LAZY)
  private List<Long> cartMealboxIds = new ArrayList<>();

  public void addCartMealboxId(long cartMealboxId) {
    cartMealboxIds.add(cartMealboxId);
  }
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

  @OneToOne(mappedBy = "order")
  private PayInfo payInfo;

  public void addPayInfo(PayInfo payInfo) {
    this.payInfo = payInfo;
    if(payInfo.getOrder() != this) {
      payInfo.addOrder(this);
    }
  }

  public void paid() {
    this.status = OrderStatus.ORDER_COMPLETED;
  }

  public void cancelOrder() {
    this.status = OrderStatus.ORDER_CANCELED;
  }

  public void completeDelivery() {
    this.status = OrderStatus.DELIVERY_COMPLETED;
    deliveryDate = LocalDate.now();
  }

  public void applyRefund() {
    this.status = OrderStatus.REFUND_APPLIED;
  }

  public void refundOrder() {
    this.status = OrderStatus.REFUNDED;
  }

  public void makeOrderNumber() {
    String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    this.orderNumber = date + RandomStringUtils.randomNumeric(6);
  }
}