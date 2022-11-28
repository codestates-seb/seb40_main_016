import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";

import { SettingProps } from "../../../types/setting";
import { DeleteUser } from "../../../api/user";

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

const DeleteAccount = ({ userId, token, movePage }: SettingProps) => {
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isOn, setIsOn] = useState<boolean>(false);

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    /* 이전 비밀번호 불러와서 일치하는지 확인
    setIsError(() => {}); */
    setPassword(() => e.target.value);
  };

  const deleteUser = () => {
    DeleteUser(userId, token)
      .then((res: any) => {
        if (res.status === 204) {
          alert("회원탈퇴 성공😿");
          movePage();
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          alert("회원탈퇴 실패😺");
        }
      });
  };

  return (
    <Wrapper>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        onChange={changePassword}
        label="비밀번호 입력"
        isError={isError}
        errorMsg="현재 비밀번호와 일치하게 입력해 주세요."
      />
      <Button
        width="200px"
        height="60px"
        isShadow={true}
        textColor="red"
        onClick={() => setIsOn(() => true)}
        disabled={isError || password.length <= 0}
      >
        확인
      </Button>
      <Modal className="checkModal" bg={true} maxWidth="500px" isOn={isOn} setIsOn={setIsOn}>
        <p>정말 탈퇴하시겠습니까? 😿</p>
        <img src="./assets/no-comments-clipart.png" alt="" />
        <ButtonWrapper>
          <Button width="200px" height="60px" isShadow={true} textColor="red" onClick={deleteUser}>
            확인
          </Button>
          <Button width="200px" height="60px" isShadow={true} onClick={() => setIsOn(() => false)}>
            취소
          </Button>
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

export default DeleteAccount;
