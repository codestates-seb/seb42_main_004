package com.example.server.user.mapper;

import com.example.server.user.dto.UserPostDto;
import com.example.server.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

  User userPostDtoToUser(UserPostDto userPostDto);

//  User userPatchDtoToUser(UserPatchDto userPatchDto) {
//    return User.builder()
//
//  }

}
