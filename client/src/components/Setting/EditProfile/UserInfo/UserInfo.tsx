/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useState, useEffect } from "react";

import Input from "../../../Input/Input";

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
  const [contentErr, setContentErr] = useState<boolean>(false);
  const [birthErr, setBirthErr] = useState<boolean>(false);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(!isUserName(e.target.value));
    setUserInfo((userInfo) => ({ ...userInfo, userName: e.target.value }));
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentErr(() => (e.target.value.length >= 150 ? true : false));
    setUserInfo((userInfo) => ({ ...userInfo, content: e.target.value }));
  };

  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthErr(!CheckBirth(e.target.value));
    setUserInfo((userInfo) => ({ ...userInfo, userBirth: e.target.value }));
  };

  useEffect(() => {
    if (!userNameErr && !contentErr && !birthErr) {
      setHasNoError(true);
    } else {
      setHasNoError(false);
    }
  }, [userNameErr, contentErr, birthErr]);

  return (
    <Wrapper>
      {userInfo.userType === "PERSON" ? (
        <Input
          type="text"
          value={userInfo.userName}
          placeholder="닉네임을 입력하세요"
          onChange={onChangeUserName}
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
          label="이름"
          isError={userNameErr}
          errorMsg="한글, 영문, 숫자 조합 2-10자리로 입력해 주세요."
        />
      )}

      <TextareaWrapper>
        <label>소개 (선택)</label>
        <Textarea
          placeholder="자기소개를 입력하세요"
          maxLength={150}
          defaultValue={userInfo.content}
          onChange={(e) => onChangeContent(e)}
        />
        {contentErr && <ErrorMsgStyle>자기소개는 150자까지만 입력해 주세요.</ErrorMsgStyle>}
      </TextareaWrapper>

      {userInfo.userType !== "PERSON" && (
        <Input
          type="date"
          value={userInfo.userBirth}
          placeholder="생일을 입력하세요"
          onChange={onChangeBirth}
          label="생년월일 (선택)"
          isError={birthErr}
          errorMsg="연도를 정확히 입력해 주세요."
        />
      )}
    </Wrapper>
  );
};

export default UserInfo;
