package com.cocoa.catdog.user.mapper;

import com.cocoa.catdog.user.dto.*;
import com.cocoa.catdog.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserPostDto userPostDto);

    User userPatchDtoToUser(UserPatchDto userPatchDto);

    UserResponseDto userToUserResponseDto(User user);
    List<UserResponseDto> usersToUserResponseDto(List<User> users);
    List<UserBirthDto> usersToUserBirthDto(List<User> users);
    UserProfileResponseDto userToUserProfileResponseDto(User user);


}