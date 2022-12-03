package com.cocoa.catdog.message.event;

import com.cocoa.catdog.message.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
