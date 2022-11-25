package com.cocoa.catdog.user.repository;

import com.cocoa.catdog.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByUserId(long userId);

    User findByUserName(String username);

    Page<User> findByUserBirthIs(PageRequest userId, LocalDate today);

    boolean existsByEmail(String email);



//    Page<User> findByUserBirthIs(PageRequest, Date today);
}
