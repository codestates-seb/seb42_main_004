package com.example.server.order.mapper;

import com.example.server.order.dto.OrderResponseDto;
import com.example.server.order.entity.Orders;
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
      //밀박스 내용 + 재료 내용 채워야함
      return orderResponseDto;
    }).collect(Collectors.toList());
    return orderResponseDtos;
  }
}
