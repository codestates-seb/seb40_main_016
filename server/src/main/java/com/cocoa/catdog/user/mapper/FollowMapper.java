package com.cocoa.catdog.user.mapper;

import com.cocoa.catdog.user.dto.FollowResponseDto;
import com.cocoa.catdog.user.entity.Follow;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    /*
    Follow followPostDtoToUser(FollowPostDto followPostDto);
    Follow userPatchDtoToUser(FollowPatchDto userPatchDto);
*/
    FollowResponseDto followToFollowResponseDto(Follow follow);
    List<FollowResponseDto> followsToFollowResponseDto(List<Follow> follows);


}