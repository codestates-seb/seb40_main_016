package com.cocoa.catdog.message.event;

import com.cocoa.catdog.message.event.Event;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {
    Event DtoToEntity (EventDto eventDto);
}
