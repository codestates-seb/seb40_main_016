package com.cocoa.catdog.user.mapper;

import com.cocoa.catdog.user.dto.FollowInfoResponseDto;
import com.cocoa.catdog.user.dto.FollowResponseDto;
import com.cocoa.catdog.user.dto.FollowerInfoResponseDto;
import com.cocoa.catdog.user.entity.Follow;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    FollowResponseDto followToFollowResponseDto(Follow follow);
    List<FollowResponseDto> followsToFollowResponseDto(List<Follow> follows);
    List<FollowInfoResponseDto> followsToFollowInfoResponseDto(List<Follow> follows);
    List<FollowerInfoResponseDto> followsToFollowerInfoResponseDto(List<Follow> follows);


}