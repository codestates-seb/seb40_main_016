import { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../../Button/Button";
import Input from "../../Input/Input";

import { isPassword } from "../../../utills/Regex";
import { SettingProps } from "../../../types/setting";
import { CheckPassword, PatchProfile } from "../../../api/user";

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PasswordWrapper = styled.div`
  width: 80%;

  div {
    margin-bottom: 30px;
  }

  label {
    margin-bottom: 15px;
  }
`;

const ButtonWrapper = styled.div`
  padding: 40px 0;

  @media screen and (max-width: 736px) {
    display: flex;
    justify-content: center;
    width: 80%;
  }

  button {
    @media screen and (max-width: 736px) {
      width: 100%;
    }

    &:first-child {
      margin-right: 20px;
    }
  }
`;

const ChangePassword = ({ token, movePage }: SettingProps) => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    checkPassword: "",
  });
  const [passwordErr, setPasswordErr] = useState({
    currentPassword: false,
    newPassword: false,
    checkPassword: false,
  });
  const [hasNoError, setHasNoError] = useState<boolean>(true);

  const changeCurPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, currentPassword: e.target.value });
  };

  const blurCurPassword = () => {
    CheckPassword(token, password.currentPassword)
      .then((res) => {
        if (res.status === 200) {
          setPasswordErr(() => ({ ...passwordErr, currentPassword: false }));
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setPasswordErr(() => ({ ...passwordErr, currentPassword: true }));
        }
      });
  };

  const changeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(() => ({ ...passwordErr, newPassword: !isPassword(e.target.value) }));
    setPassword({ ...password, newPassword: e.target.value });
  };

  const changeCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(() => ({ ...passwordErr, checkPassword: password.newPassword !== e.target.value }));
    setPassword({ ...password, checkPassword: e.target.value });
  };

  const isNoEmpty = () => {
    return password.currentPassword.length > 0 && password.newPassword.length > 0 && password.checkPassword.length > 0;
  };

  const submitPassword = () => {
    const formData = new FormData();

    formData.append(
      "patchDto",
      new Blob([JSON.stringify({ password: password.newPassword })], {
        type: "application/json",
      }),
    );

    PatchProfile(formData, token)
      .then((res: any) => {
        if (res.status === 200) {
          alert("???????????? ?????? ??????????");
          movePage();
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          alert("???????????? ?????? ??????????");
        }
      });
  };

  useEffect(() => {
    if (!passwordErr.currentPassword && !passwordErr.newPassword && !passwordErr.checkPassword) {
      setHasNoError(true);
    } else {
      setHasNoError(false);
    }
  }, [passwordErr]);

  return (
    <Wrapper>
      <PasswordWrapper>
        <Input
          type="password"
          placeholder="?????? ??????????????? ???????????????"
          onChange={changeCurPassword}
          onBlur={blurCurPassword}
          label="?????? ????????????"
          isError={passwordErr.currentPassword}
          errorMsg="?????? ??????????????? ???????????? ????????? ?????????."
        />
        <Input
          type="password"
          placeholder="??? ??????????????? ???????????????"
          onChange={changeNewPassword}
          label="??? ????????????"
          isError={passwordErr.newPassword}
          errorMsg="??????, ?????? ?????? 8-10????????? ????????? ?????????."
        />
        <Input
          type="password"
          placeholder="??? ??????????????? ???????????????"
          onChange={changeCheckPassword}
          label="??? ???????????? ??????"
          isError={passwordErr.checkPassword}
          errorMsg="????????? ??????????????? ???????????? ????????? ?????????."
        />
      </PasswordWrapper>
      <ButtonWrapper>
        <Button
          width="200px"
          height="60px"
          isShadow={true}
          onClick={submitPassword}
          disabled={!hasNoError || !isNoEmpty()}
        >
          ???????????? ??????
        </Button>
        <Button
          width="200px"
          height="60px"
          isShadow={true}
          textColor="red"
          onClick={() => {
            if (confirm("??????????????? ???????????? ????????????. ?????????????????????????")) movePage();
          }}
        >
          ??????
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ChangePassword;
