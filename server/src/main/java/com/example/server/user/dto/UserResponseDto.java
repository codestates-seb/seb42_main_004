package com.example.server.user.dto;


import com.example.server.image.entity.UserImage;
import com.example.server.user.data.UserStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {

  private Long id;
  private String email;
  private String password;
  private String name;
  private String phoneNumber;
  private String address;

  private UserImage image;
  private UserStatus status;
  private LocalDateTime createdDate;
  private LocalDateTime lastModifiedDate;

}
