/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useState } from "react";

import Input from "../../../Input/Input";
import Gender from "../../../Gender/Gender";

import { Wrapper, TextareaWrapper, Textarea, ErrorMsgStyle } from "./style";
import { EditProfileInfo } from "../../../../types/user";
import CheckBirth from "../../../../utills/BirthYearCheck";
import { isUserName } from "../../../../utills/Regex";

interface UserInfoProps {
  userInfo: EditProfileInfo;
  setUserInfo: (arg: (arg: EditProfileInfo) => EditProfileInfo) => void;
  setHasNoError: (arg: boolean) => void;
}

const UserInfo = ({ userInfo, setUserInfo, setHasNoError }: UserInfoProps) => {
  const [userNameErr, setUserNameErr] = useState<boolean>(false);
  const [userIntroErr, setUserIntroErr] = useState<boolean>(false);
  const [birthErr, setBirthErr] = useState<boolean>(false);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(!isUserName(e.target.value));
    setUserInfo((userInfo) => ({ ...userInfo, userName: e.target.value }));
  };

  const onChangeUserIntro = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserIntroErr(() => (e.target.value.length >= 150 ? true : false));
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

      <TextareaWrapper>
        <label>소개</label>
        <Textarea
          placeholder="자기소개를 입력하세요"
          maxLength={150}
          defaultValue={userInfo.userIntro}
          onChange={(e) => onChangeUserIntro(e)}
        />
        {userIntroErr && <ErrorMsgStyle>자기소개는 150자까지만 입력해 주세요.</ErrorMsgStyle>}
      </TextareaWrapper>

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
