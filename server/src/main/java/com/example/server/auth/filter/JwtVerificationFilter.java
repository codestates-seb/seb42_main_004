package com.example.server.auth.filter;

import com.example.server.auth.details.CustomUserDetailsService;
import com.example.server.auth.jwt.JwtTokenizer;
import com.example.server.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {

  private final JwtTokenizer jwtTokenizer;
  private final CustomAuthorityUtils authorityUtils;
  private final CustomUserDetailsService customUserDetailsService;

  public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils,
                               CustomUserDetailsService customUserDetailsService) {
    this.jwtTokenizer = jwtTokenizer;
    this.authorityUtils = authorityUtils;
    this.customUserDetailsService = customUserDetailsService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    try {
      Map<String, Object> claims = verifyJws(request); // (3) jwt 토큰 검증
      log.info("### jwt 토큰 검증 완료 ###");
      setAuthenticationToContext(claims);
    } catch (SignatureException se) {
      request.setAttribute("exception", se);
    } catch (ExpiredJwtException ee) {
      request.setAttribute("exception", ee);
    } catch (Exception e) {
      request.setAttribute("exception", e);
    }
    // (4) Authentication 객체를 SecurityContext에 저장

    filterChain.doFilter(request, response); // (5) 다음 필터 호출
  }

  // (6) 헤더에 jwt 토큰이 포함되지 않은경우 필터를 패스한다.
  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    String authorization = request.getHeader("Authorization");  // (6-1)

    return authorization == null || !authorization.startsWith("Bearer");  // (6-2)
//    return false;

  }

  private Map<String, Object> verifyJws(HttpServletRequest request) {
    String jws = request.getHeader("Authorization").replace("Bearer ", ""); // (3-1)

    //쿠키에 담긴 jwt 사용?
//    Cookie cookie = Arrays.stream(request.getCookies())
//        .filter(c -> c.getName().equals("Authorization")).findFirst()
//        .orElseThrow(() -> new RuntimeException());
//    String jws = cookie.getValue().replace("Bearer ", "");
    log.info("### value is "+jws);


    String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(
        jwtTokenizer.getSecretKey()); // (3-2)
    Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey)
        .getBody();   // (3-3)

    return claims;
  }

  private void setAuthenticationToContext(Map<String, Object> claims) {
    String username = (String) claims.get("username");   // (4-1)
    List<GrantedAuthority> authorities = authorityUtils.createAuthorities(
        (List) claims.get("roles"));  // (4-2)
    Authentication authentication = new UsernamePasswordAuthenticationToken
            (customUserDetailsService.loadUserByUsername(username), null, authorities);  // (4-3)
    SecurityContextHolder.getContext().setAuthentication(authentication); // (4-4)
  }

}
