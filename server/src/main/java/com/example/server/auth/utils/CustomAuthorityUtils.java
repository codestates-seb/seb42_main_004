package com.example.server.auth.utils;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthorityUtils {
  @Value("${mail.address.admin}")
  private String adminMailAddress;


  private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
  private final List<String> USER_ROLES_STRING = List.of("USER");

  public List<String> createRoles(String email) {
    if (email.equals(adminMailAddress)) {
      return ADMIN_ROLES_STRING;
    } else {
      return USER_ROLES_STRING;
    }
  }
  public List<GrantedAuthority> createAuthorities(List<String> roles) {
    List<GrantedAuthority> authorities = roles.stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
        .collect(Collectors.toList());
    return authorities;
  }

}
