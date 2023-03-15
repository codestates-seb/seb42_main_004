package com.example.server.payment.repository;

import com.example.server.payment.Entity.PayInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayInfoRepository extends JpaRepository<PayInfo, Long> {

}
