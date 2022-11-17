package com.cocoa.catdog.user.repository;

import com.cocoa.catdog.user.entity.Follow;
import com.cocoa.catdog.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollowingUser(Optional<User> user);
    List<Follow> findByFollowedUser(Optional<User> user);
    Optional<Follow> findByFollowedUser(long followId);
    Optional<Follow> findByFollowingUserAndFollowedUser(User user1, User user2);
}
