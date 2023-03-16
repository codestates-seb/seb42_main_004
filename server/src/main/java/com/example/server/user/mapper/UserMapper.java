package com.example.server.user.mapper;

import com.example.server.user.dto.UserPatchDto;
import com.example.server.user.dto.UserPostDto;
import com.example.server.user.dto.UserResponseDto;
import com.example.server.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

  User userPostDtoToUser(UserPostDto userPostDto);

  default User userPatchDtoToUser(UserPatchDto patchDto) {
    return User.builder().id(patchDto.getId())
        .name(patchDto.getName())
        .password(patchDto.getPassword())
        .phoneNumber(patchDto.getPhoneNumber())
        .address(patchDto.getAddress())
        .deliveryInformation(patchDto.getDeliveryInformation())
        .build();
  }

  UserResponseDto userToUserResponseDto(User user);
}
