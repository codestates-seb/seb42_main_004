package com.example.server.auth.utils;

import java.net.URI;
import org.springframework.web.util.UriComponentsBuilder;

public class UriCreator {
  public static URI createUri(String defaultUrl, long resourceId) {
    return UriComponentsBuilder
        .newInstance()
        .path(defaultUrl + "/{resource-id}")
        .buildAndExpand(resourceId)
        .toUri();
  }

}
