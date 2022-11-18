import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import Input from "../../components/Input/Input";
import Gender from "../../components/Gender/Gender";
import CheckBirth from "../../utills/BirthYearCheck";
import { isUserName, isEmail, isPassword } from "../../utills/Regex";
import { Wrapper } from "./style";

interface UserInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  content: string;
  userType: "human" | "cat" | "dog" | "";
  userBirth: string;
  userGender: string;
}

interface Prop {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  setHasNoError: (arg: boolean) => void;
}

const StepForm = ({ userInfo, setUserInfo, setHasNoError }: Prop) => {
  const [userNameErr, setUserNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [birthErr, setBirthErr] = useState(false);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(!isUserName(e.target.value));
    setUserInfo({ ...userInfo, userName: e.target.value });
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErr(!isEmail(e.target.value));
    setUserInfo({ ...userInfo, email: e.target.value });
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(!isPassword(e.target.value));
    setUserInfo({ ...userInfo, password: e.target.value });
  };
  const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, userGender: String(e.target.dataset.gender) });
  };
  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthErr(!CheckBirth(e.target.value));
    setUserInfo({ ...userInfo, userBirth: e.target.value });
  };

  useEffect(() => {
    if (!userNameErr && !emailErr && !passwordErr && !birthErr) {
      setHasNoError(true);
    } else {
      setHasNoError(false);
    }
  }, [userNameErr, emailErr, passwordErr, birthErr]);

  return (
    <>
      <Wrapper>
        {userInfo.userType === "human" ? (
          <Input
            type="text"
            value={userInfo.userName}
            placeholder="닉네임을 입력하세요"
            onChange={onChangeUserName}
            height="50px"
            inputColor="ivory"
            fontSize="pc-regular"
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
            inputColor="ivory"
            fontSize="pc-regular"
            label="이름"
            isError={userNameErr}
            errorMsg="한글, 영문, 숫자 조합 2-10자리로 입력해 주세요."
          />
        )}

        <Input
          type="text"
          value={userInfo.email}
          placeholder="이메일을 입력하세요"
          onChange={onChangeEmail}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="이메일"
          isError={emailErr}
          errorMsg="이메일 형식에 맞게 입력해 주세요."
        />
        <Input
          type="password"
          value={userInfo.password}
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="비밀번호"
          isError={passwordErr}
          errorMsg="영문, 숫자 조합 8-10자리로 입력해 주세요."
        />
        {userInfo.userType !== "human" ? (
          <>
            <Gender height="50px" fontSize="pc-regular" onChange={onChangeGender} defaultValue="boy" />
            <Input
              type="date"
              value={userInfo.userBirth}
              placeholder="셍일을 입력하세요"
              onChange={onChangeBirth}
              height="50px"
              inputColor="ivory"
              fontSize="pc-regular"
              label="생년월일 (선택)"
              isError={birthErr}
              errorMsg="연도를 정확히 입력해 주세요."
            />
          </>
        ) : (
          ""
        )}
      </Wrapper>
    </>
  );
};

export default StepForm;
