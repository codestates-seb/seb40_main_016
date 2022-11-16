package com.cocoa.catdog.user.repository;

import com.cocoa.catdog.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUserId(long userId);

    User findByUserName(String username);
}