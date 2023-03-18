package com.example.server.auth.details;

import com.example.server.auth.utils.CustomAuthorityUtils;
import com.example.server.exception.BusinessLogicException;
import com.example.server.user.entity.User;
import com.example.server.user.exception.UserException;
import com.example.server.user.repository.UserRepository;
import java.util.Optional;
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
    User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(UserException.USER_NOT_FOUND));

    return new PrincipalDetails(findUser,authorityUtils);
  }


}
