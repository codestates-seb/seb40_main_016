package com.cocoa.catdog.wallet.repository;

import com.cocoa.catdog.wallet.entity.GiveTake;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiveTakeRepository extends JpaRepository<GiveTake, Long> {
}
