package com.example.server.order.mapper;

import com.example.server.mealbox.dto.MealboxProductResponseDto;
import com.example.server.mealbox.entity.MealboxProduct;
import com.example.server.order.dto.OrderMealboxPostDto;
import com.example.server.order.dto.OrderMealboxResponseDto;
import com.example.server.order.dto.OrderPageResponseDto;
import com.example.server.order.dto.OrderPostDto;
import com.example.server.order.dto.OrderResponseDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.entity.OrdersMealbox;
import com.example.server.order.entity.OrdersProduct;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {

  default Orders orderPostDtoToOrders(OrderPostDto orderPostDto) {
    Orders order = new Orders();
    List<Long> cartMealboxIds = orderPostDto.getMealboxes().stream().map(
        OrderMealboxPostDto::getCartMealboxId).collect(
        Collectors.toList());
    for(Long cartMealboxId: cartMealboxIds) {
      order.addCartMealboxId(cartMealboxId);
    }
    return order;
  }
  default OrderPageResponseDto ordersToOrderPageResponseDto(Orders orders) {
    OrderPageResponseDto orderPageResponseDto = new OrderPageResponseDto();
    orderPageResponseDto.setOrderNumber(orders.getOrderNumber());
    orderPageResponseDto.setUserZipCode(orders.getUser().getAddress().getZipCode());
    orderPageResponseDto.setUserSimpleAddress(orders.getUser().getAddress().getSimpleAddress());
    orderPageResponseDto.setUserDetailAddress(orders.getUser().getAddress().getDetailAddress());
    orderPageResponseDto.setUsername(orders.getUser().getName());
    orderPageResponseDto.setUserPhoneNumber(orders.getUser().getPhoneNumber());
    orderPageResponseDto.setAddressee(orders.getUser().getDeliveryInformation().getName());
    orderPageResponseDto.setDeliveryZipCode(orders.getUser().getDeliveryInformation().getAddress().getZipCode());
    orderPageResponseDto.setDeliverySimpleAddress(orders.getUser().getDeliveryInformation().getAddress().getSimpleAddress());
    orderPageResponseDto.setDeliveryDetailAddress(orders.getUser().getDeliveryInformation().getAddress().getDetailAddress());
    orderPageResponseDto.setAddresseePhoneNumber(orders.getUser().getDeliveryInformation().getPhoneNumber());
    orderPageResponseDto.setTotalPrice(orders.getTotalPrice());
    orderPageResponseDto.setEmail(orders.getUser().getEmail());
    return orderPageResponseDto;
  }

  default List<OrderResponseDto> OrdersToOrderResponseDtos(List<Orders> orders) {
    if(orders == null) return null;
    List<OrderResponseDto> orderResponseDtos = orders.stream().map(order -> {
      OrderResponseDto orderResponseDto = new OrderResponseDto();
      orderResponseDto.setUsername(order.getUser().getName());
      orderResponseDto.setOrderNumber(order.getOrderNumber());
      orderResponseDto.setCreatedAt(order.getCreatedDate().plusHours(9));
      orderResponseDto.setOrderStatus(order.getStatus().getStatus());
      orderResponseDto.setDeliveryDate(order.getDeliveryDate());
      orderResponseDto.setTotalPrice(order.getTotalPrice());
      List<OrdersMealbox> ordersMealboxList = order.getOrdersMealboxes();
      List<OrderMealboxResponseDto> orderMealboxResponseList = ordersMealboxList.stream().map(ordersMealbox -> {
        OrderMealboxResponseDto orderMealboxResponseDto = new OrderMealboxResponseDto();
        orderMealboxResponseDto.setMealboxName(ordersMealbox.getName());
        orderMealboxResponseDto.setMealboxPrice(ordersMealbox.getPrice());
        orderMealboxResponseDto.setMealboxQuantity(ordersMealbox.getQuantity());
        orderMealboxResponseDto.setMealboxKcal(ordersMealbox.getKcal());
//        List<MealboxProduct> mealboxProductList = ordersMealbox.getMealbox().getMealboxProducts();
//        List<MealboxProductResponseDto> mealboxProductResponseDtoList = mealboxProductList.stream().map(mealboxProduct -> {
//          MealboxProductResponseDto mealboxProductResponseDto = new MealboxProductResponseDto();
//          mealboxProductResponseDto.setName(mealboxProduct.getProduct().getName());
//          mealboxProductResponseDto.setQuantity(mealboxProduct.getQuantity());
//          return mealboxProductResponseDto;
//        }).collect(Collectors.toList());
//        orderMealboxResponseDto.setProducts(mealboxProductResponseDtoList);
        List<OrdersProduct> ordersProductList = ordersMealbox.getOrdersProducts();
        List<MealboxProductResponseDto> mealboxProductResponseDtoList = ordersProductList.stream().map(ordersProduct -> {
          MealboxProductResponseDto mealboxProductResponseDto = new MealboxProductResponseDto();
          mealboxProductResponseDto.setName(ordersProduct.getName());
          mealboxProductResponseDto.setQuantity(ordersProduct.getQuantity());
          return mealboxProductResponseDto;
        }).collect(Collectors.toList());
        orderMealboxResponseDto.setProducts(mealboxProductResponseDtoList);
        return orderMealboxResponseDto;
      }).collect(Collectors.toList());
      orderResponseDto.setMealboxes(orderMealboxResponseList);
      return orderResponseDto;
    }).collect(Collectors.toList());
    return orderResponseDtos;
  }
}
