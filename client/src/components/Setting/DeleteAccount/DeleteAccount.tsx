import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";

import { SettingProps } from "../../../types/setting";
import { CheckPassword, PatchProfile } from "../../../api/user";
import { useSetRecoilState } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import refreshTokenState from "../../../_state/refreshTokenState";
import isLoginState from "../../../_state/isLoginState";
import userInfoState from "../../../_state/userInfoState";

const Wrapper = styled.div`
  width: 60%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  div:first-child {
    width: 70%;
    margin-bottom: 30px;
  }

  label {
    margin-bottom: 30px;
  }

  & > button {
    margin-top: 20px;

    @media screen and (max-width: 736px) {
      width: 70%;
    }
  }

  .checkModal {
    padding: 30px 0;

    p {
      margin-bottom: 10px;
    }
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;

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

const DeleteAccount = ({ token, movePage }: SettingProps) => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isOn, setIsOn] = useState<boolean>(false);

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    CheckPassword(token, e.target.value)
      .then((res) => {
        if (res.status === 200) {
          setIsError(() => false);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setIsError(() => true);
        }
      });

    setPassword(() => e.target.value);
  };

  const deleteUser = () => {
    const formData = new FormData();

    formData.append(
      "patchDto",
      new Blob([JSON.stringify({ userStatus: "USER_DROPPED" })], {
        type: "application/json",
      }),
    );

    PatchProfile(formData, token)
      .then((res: any) => {
        if (res.status === 200) {
          alert("???????????? ??????????");
          setAccessToken(null);
          setRefreshToken(null);
          setIsLogin(false);
          setUserInfo({
            userName: "",
            userImg: "",
            userType: "",
          });
          movePage();
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          alert("???????????? ??????????");
        }
      });
  };

  return (
    <Wrapper>
      <Input
        type="password"
        placeholder="??????????????? ???????????????"
        onChange={changePassword}
        label="???????????? ??????"
        isError={isError}
        errorMsg="?????? ??????????????? ???????????? ????????? ?????????."
      />
      <Button
        width="200px"
        height="60px"
        isShadow={true}
        textColor="red"
        onClick={() => setIsOn(() => true)}
        disabled={isError || password.length <= 0}
      >
        ??????
      </Button>
      <Modal className="checkModal" bg={true} maxWidth="500px" isOn={isOn} setIsOn={setIsOn}>
        <p>?????? ????????????????????????? ????</p>
        <img src="./assets/no-comments-clipart.png" alt="" />
        <ButtonWrapper>
          <Button width="200px" height="60px" isShadow={true} textColor="red" onClick={deleteUser}>
            ??????
          </Button>
          <Button width="200px" height="60px" isShadow={true} onClick={() => setIsOn(() => false)}>
            ??????
          </Button>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

export default DeleteAccount;
