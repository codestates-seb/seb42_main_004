package com.example.server.baseEntity;

import javax.persistence.Column;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
@Getter
public abstract class baseEntityWithBy extends BaseEntity {

  @CreatedBy
  @Column(updatable = false, name = "created_by")
  private String createdBy;

  @LastModifiedBy
  @Column(name = "modified_by")
  private String lastModifiedBy;
}
