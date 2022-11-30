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

const ChangePassword = ({ userId, token, movePage }: SettingProps) => {
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

    PatchProfile(userId, formData, token)
      .then((res: any) => {
        if (res.status === 200) {
          alert("비밀번호 변경 성공😺");
          movePage();
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          alert("비밀번호 변경 실패😿");
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
          placeholder="이전 비밀번호를 입력하세요"
          onChange={changeCurPassword}
          onBlur={blurCurPassword}
          label="이전 비밀번호"
          isError={passwordErr.currentPassword}
          errorMsg="현재 비밀번호와 일치하게 입력해 주세요."
        />
        <Input
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          onChange={changeNewPassword}
          label="새 비밀번호"
          isError={passwordErr.newPassword}
          errorMsg="영문, 숫자 조합 8-10자리로 입력해 주세요."
        />
        <Input
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          onChange={changeCheckPassword}
          label="새 비밀번호 확인"
          isError={passwordErr.checkPassword}
          errorMsg="새로운 비밀번호와 일치하게 입력해 주세요."
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
          비밀번호 변경
        </Button>
        <Button
          width="200px"
          height="60px"
          isShadow={true}
          textColor="red"
          onClick={() => {
            if (confirm("변경사항이 저장되지 않습니다. 취소하시겠습니까?")) movePage();
          }}
        >
          취소
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ChangePassword;
