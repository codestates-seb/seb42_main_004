package com.example.server.order.mapper;

import com.example.server.order.dto.OrderMealboxResponseDto;
import com.example.server.order.dto.OrderResponseDto;
import com.example.server.order.entity.Orders;
import com.example.server.order.entity.OrdersMealbox;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
  default List<OrderResponseDto> OrdersToOrderResponseDtos(List<Orders> orders) {
    if(orders == null) return null;
    List<OrderResponseDto> orderResponseDtos = orders.stream().map(order -> {
      OrderResponseDto orderResponseDto = new OrderResponseDto();
      orderResponseDto.setUsername(order.getUser().getName());
      orderResponseDto.setOrderNumber(order.getOrderNumber());
      orderResponseDto.setCreatedAt(order.getCreatedDate());
      orderResponseDto.setOrderStatus(order.getStatus().getStatus());
      List<OrdersMealbox> ordersMealboxList = order.getOrdersMealboxes();
      List<OrderMealboxResponseDto> orderMealboxResponseList = ordersMealboxList.stream().map(ordersMealbox -> {
        OrderMealboxResponseDto orderMealboxResponseDto = new OrderMealboxResponseDto();
        orderMealboxResponseDto.setMealboxName(ordersMealbox.getMealbox().getName());
        orderMealboxResponseDto.setMealboxPrice(ordersMealbox.getPrice());
        orderMealboxResponseDto.setMealboxQuantity(ordersMealbox.getQuantity());
        // 재료, 수량 추가해야함
        return orderMealboxResponseDto;
      }).collect(Collectors.toList());
      orderResponseDto.setMealboxes(orderMealboxResponseList);
      return orderResponseDto;
    }).collect(Collectors.toList());
    return orderResponseDtos;
  }
}
