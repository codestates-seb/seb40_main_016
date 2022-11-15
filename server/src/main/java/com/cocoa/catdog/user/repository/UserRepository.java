package com.cocoa.catdog.user.repository;

import com.cocoa.catdog.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
