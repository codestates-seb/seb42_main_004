package com.example.server.auth.details;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.user.entity.User;
import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class PrincipalDetails extends User implements UserDetails {
  private final CustomAuthorityUtils authorityUtils;
  private Map<String, Object> attributes;

  public PrincipalDetails(User user, CustomAuthorityUtils authorityUtils) {
    super(user);
    this.authorityUtils = authorityUtils;
  }

  public PrincipalDetails(User user, CustomAuthorityUtils authorityUtils, Map<String, Object> attributes) {
    super(user);
    this.authorityUtils = authorityUtils;
    this.attributes = attributes;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorityUtils.createAuthorities(this.getRoles());
  }

  @Override
  public String getUsername() {
    return getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}

