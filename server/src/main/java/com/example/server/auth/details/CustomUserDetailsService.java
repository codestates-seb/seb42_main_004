package com.example.server.auth.details;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.exception.BusinessLogicException;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.util.Collection;
import java.util.Optional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;
  private final CustomAuthorityUtils authorityUtils;

  public CustomUserDetailsService(UserRepository userRepository,
      CustomAuthorityUtils authorityUtils) {
    this.userRepository = userRepository;
    this.authorityUtils = authorityUtils;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionalUser = userRepository.findByEmail(username);
    User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(UserException.MEMBER_NOT_FOUND));

    return new CustomUserDetails(findUser);
  }

  private final class CustomUserDetails extends User implements UserDetails {
    CustomUserDetails(User user) {
      setId(user.getId());
      setEmail(user.getEmail());
      setPassword(user.getPassword());
      setRoles(user.getRoles());
      //TODO CustomUserDetails 에 다른 필드도 추가해야하나?
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
}
