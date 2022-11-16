package com.cocoa.catdog.user.repository;

import com.cocoa.catdog.user.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFollowingUser(long followId);
}
