import { useState, Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";

import Input from "../Input/Input";
import Gender from "../Gender/Gender";
import CheckBirth from "../../utills/BirthYearCheck";
import { isUserName, isPassword } from "../../utills/Regex";
import { GroupForm, GroupRadio, RadioConts } from "./style";

import { SignupUserInfo } from "../../types/user";

interface Prop {
  userInfo: SignupUserInfo;
  setUserInfo: Dispatch<SetStateAction<SignupUserInfo>>;
  setHasNoError: (arg: boolean) => void;
}

const SocialForm = ({ userInfo, setUserInfo, setHasNoError }: Prop) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [birthErr, setBirthErr] = useState(false);

  const onTypeChange = (type: "PERSON" | "CAT" | "DOG") => {
    if (!isOpened) setIsOpened(true);
    setUserInfo({
      ...userInfo,
      userType: `${type}`,
    });
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(!isUserName(e.target.value));
    setUserInfo({
      ...userInfo,
      userName: `${e.target.value}`,
    });
  };

  const onPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(!isPassword(e.target.value));
    setUserInfo({
      ...userInfo,
      password: `${e.target.value}`,
    });
  };

  const onClickGender = (gender: "MALE" | "FEMALE") => {
    setUserInfo({
      ...userInfo,
      userGender: `${gender}`,
    });
  };

  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthErr(!CheckBirth(e.target.value));
    setUserInfo({
      ...userInfo,
      userBirth: e.target.value,
    });
  };

  useEffect(() => {
    if (!userNameErr && !passwordErr && !birthErr) {
      setHasNoError(true);
    } else {
      setHasNoError(false);
    }
  }, [userNameErr, passwordErr, birthErr]);

  return (
    <>
      <GroupForm>
        <GroupRadio>
          <p>타입</p>
          <RadioConts>
            <input
              id="human-type"
              name="type"
              type="radio"
              onChange={() => {
                onTypeChange("PERSON");
              }}
            ></input>
            <label htmlFor="human-type">사람</label>
            <input
              id="cat-type"
              name="type"
              type="radio"
              onChange={() => {
                onTypeChange("CAT");
              }}
            ></input>
            <label htmlFor="cat-type">고양이</label>
            <input
              id="dog-type"
              name="type"
              type="radio"
              onChange={() => {
                onTypeChange("DOG");
              }}
            ></input>
            <label htmlFor="dog-type">강아지</label>
          </RadioConts>
        </GroupRadio>
        {isOpened ? (
          <>
            <Input
              type="text"
              value={userInfo.userName}
              placeholder={userInfo.userType === "PERSON" ? "닉네임을 입력하세요" : "초코, 행운이"}
              onChange={onNameChange}
              height="50px"
              inputColor="ivory"
              fontSize="pc-regular"
              label={userInfo.userType === "PERSON" ? "닉네임" : "이름"}
              isError={userNameErr}
              errorMsg="2-10자리로 입력해 주세요.(한글, 영문, 숫자 가능)"
            />
            <Input
              type="password"
              value={userInfo.password}
              placeholder="비밀번호를 입력하세요"
              onChange={onPassword}
              height="50px"
              inputColor="ivory"
              fontSize="pc-regular"
              label="비밀번호"
              isError={passwordErr}
              errorMsg="영문, 숫자 조합 8-10자리로 입력해 주세요."
            />
            {userInfo.userType !== "PERSON" ? (
              <Gender
                height="50px"
                fontSize="pc-regular"
                onClickMale={() => {
                  onClickGender("MALE");
                }}
                onClickFemale={() => {
                  onClickGender("FEMALE");
                }}
                defaultValue="MALE"
              />
            ) : null}
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
        ) : null}
      </GroupForm>
    </>
  );
};

export default SocialForm;
