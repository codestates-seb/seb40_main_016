import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import Input from "../../Input/Input";
import Gender from "../../Gender/Gender";
import CheckBirth from "../../../utills/BirthYearCheck";
import { isUserName, isEmail, isPassword } from "../../../utills/Regex";
import { Wrapper } from "./style";

import { SignupUserInfo } from "../../../types/user";

interface Prop {
  userInfo: SignupUserInfo;
  setUserInfo: Dispatch<SetStateAction<SignupUserInfo>>;
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
  const onClickMale = () => {
    setUserInfo({ ...userInfo, userGender: "MALE" });
  };
  const onClickFemale = () => {
    setUserInfo({ ...userInfo, userGender: "FEMALE" });
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
        {userInfo.userType === "PERSON" ? (
          <Input
            type="text"
            value={userInfo.userName}
            placeholder="???????????? ???????????????"
            onChange={onChangeUserName}
            height="50px"
            inputColor="ivory"
            fontSize="pc-regular"
            label="?????????"
            isError={userNameErr}
            errorMsg="2-10????????? ????????? ?????????.(??????, ??????, ?????? ??????)"
          />
        ) : (
          <Input
            type="text"
            value={userInfo.userName}
            placeholder="??????, ?????????"
            onChange={onChangeUserName}
            height="50px"
            inputColor="ivory"
            fontSize="pc-regular"
            label="??????"
            isError={userNameErr}
            errorMsg="2-10????????? ????????? ?????????.(??????, ??????, ?????? ??????)"
          />
        )}

        <Input
          type="text"
          value={userInfo.email}
          placeholder="example@email.com"
          onChange={onChangeEmail}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="?????????"
          isError={emailErr}
          errorMsg="????????? ????????? ?????? ????????? ?????????."
        />
        <Input
          type="password"
          value={userInfo.password}
          placeholder="??????????????? ???????????????"
          onChange={onChangePassword}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="????????????"
          isError={passwordErr}
          errorMsg="??????, ?????? ?????? 8-10????????? ????????? ?????????."
        />
        {userInfo.userType !== "PERSON" ? (
          <>
            <Gender
              height="50px"
              fontSize="pc-regular"
              onClickMale={onClickMale}
              onClickFemale={onClickFemale}
              defaultValue="MALE"
            />
            <Input
              type="date"
              value={userInfo.userBirth}
              placeholder="????????? ???????????????"
              onChange={onChangeBirth}
              height="50px"
              inputColor="ivory"
              fontSize="pc-regular"
              label="???????????? (??????)"
              isError={birthErr}
              errorMsg="????????? ????????? ????????? ?????????."
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
