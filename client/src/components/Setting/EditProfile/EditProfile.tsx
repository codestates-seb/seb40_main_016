import { useState } from "react";

import UserInfo from "./UserInfo/UserInfo";
import Button from "../../Button/Button";

import { Wrapper, UserInfoWrapper, AvatarWrapper, ButtonWrapper } from "./style";
import { EditProfileInfo } from "../../../types/user";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState<EditProfileInfo>({
    userName: "",
    userIntro: "",
    userBirth: "",
    userGender: "MALE",
    userType: "",
  });
  const [hasNoError, setHasNoError] = useState<boolean>(false);

  return (
    <Wrapper>
      <UserInfoWrapper>
        <AvatarWrapper>
          <img
            src="https://user-images.githubusercontent.com/104997140/202474784-96d87ed2-2bff-4400-8c18-7045af22dbd6.jpg"
            alt="프로필 이미지"
          />
          <button>프로필 사진 바꾸기</button>
        </AvatarWrapper>
        <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} setHasNoError={setHasNoError} />
      </UserInfoWrapper>
      <ButtonWrapper>
        <Button width="200px" height="60px" isShadow={true} onClick={() => console.log("완료!")}>
          완료
        </Button>
        <Button width="200px" height="60px" isShadow={true} textColor="red" onClick={() => console.log("취소!")}>
          취소
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EditProfile;
