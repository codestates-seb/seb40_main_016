import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import Input from "../../../Input/Input";
import Gender from "../../../Gender/Gender";

import { EditProfileInfo } from "../../../../types/user";
import CheckBirth from "../../../../utills/BirthYearCheck";
import { isUserName } from "../../../../utills/Regex";

interface UserInfoProps {
  userInfo: EditProfileInfo;
  setUserInfo: (arg: (arg: EditProfileInfo) => EditProfileInfo) => void;
  setHasNoError: (arg: boolean) => void;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 15px;
  margin: 40px 0;

  label {
    margin-bottom: 10px;
  }
`;

const UserInfo = ({ userInfo, setUserInfo, setHasNoError }: UserInfoProps) => {
  const [userNameErr, setUserNameErr] = useState(false);
  const [userIntroErr, setUserIntroErr] = useState(false);
  const [birthErr, setBirthErr] = useState(false);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(!isUserName(e.target.value));
    setUserInfo((userInfo) => ({ ...userInfo, userName: e.target.value }));
  };

  const onChangeUserIntro = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((userInfo) => ({ ...userInfo, userIntro: e.target.value }));
  };

  const onClickMale = () => {
    setUserInfo((userInfo) => ({ ...userInfo, userGender: "MALE" }));
  };

  const onClickFemale = () => {
    setUserInfo((userInfo) => ({ ...userInfo, userGender: "FEMALE" }));
  };

  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthErr(!CheckBirth(e.target.value));
    setUserInfo((userInfo) => ({ ...userInfo, userBirth: e.target.value }));
  };

  return (
    <Wrapper>
      {userInfo.userType === "PERSON" ? (
        <Input
          type="text"
          value={userInfo.userName}
          placeholder="닉네임을 입력하세요"
          onChange={onChangeUserName}
          height="50px"
          label="닉네임"
          isError={userNameErr}
          errorMsg="한글, 영문, 숫자 조합 2-10자리로 입력해 주세요."
        />
      ) : (
        <Input
          type="text"
          value={userInfo.userName}
          placeholder="초코, 행운이"
          onChange={onChangeUserName}
          height="50px"
          label="이름"
          isError={userNameErr}
          errorMsg="한글, 영문, 숫자 조합 2-10자리로 입력해 주세요."
        />
      )}

      <Input
        type="text"
        value={userInfo.userIntro}
        placeholder="자기소개를 입력하세요"
        onChange={onChangeUserIntro}
        height="100px"
        label="소개"
        isError={userIntroErr}
        errorMsg="자기소개는 150자까지만 입력해 주세요."
      />

      {userInfo.userType !== "PERSON" ? (
        <>
          <Gender height="50px" onClickMale={onClickMale} onClickFemale={onClickFemale} defaultValue="MALE" />
          <Input
            type="date"
            value={userInfo.userBirth}
            placeholder="생일을 입력하세요"
            onChange={onChangeBirth}
            height="50px"
            label="생년월일 (선택)"
            isError={birthErr}
            errorMsg="연도를 정확히 입력해 주세요."
          />
        </>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default UserInfo;
