import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../Modal/Modal";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Loading from "../../Loading/Loading";
import { isEmail } from "../../../utills/Regex";
import { PostHelpPw } from "../../../api/user";

import { Wrapper, Notice, Done } from "./style";

interface Prop {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}

const FindPassword = ({ isOn, setIsOn }: Prop) => {
  const [value, setValue] = useState<string>("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsErr(!isEmail(e.target.value));
  };

  const onClick = () => {
    setIsLoading(true);
    PostHelpPw(value)
      .then((res) => {
        if (res.status === 200) {
          setIsDone(true);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        alert("임시비밀번호 발송에 실패했습니다.😿");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal title="비밀번호 찾기" maxWidth="450px" bg={true} isOn={isOn} setIsOn={setIsOn} onTitleBtnClick={() => {}}>
        <Wrapper>
          {!isDone ? (
            <>
              <Notice>
                작성하신 이메일로 임시비밀번호를 보내드립니다.
                <br />
                이메일을 정확하게 입력하세요.
              </Notice>
              <Input
                type="text"
                value={value}
                placeholder="이메일을 입력하세요"
                onChange={onChange}
                height="50px"
                inputColor="ivory"
                fontSize="pc-regular"
                label="이메일"
                isError={isErr}
                errorMsg="이메일 형식에 맞게 입력해 주세요."
              />
              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  className="login-btn"
                  onClick={onClick}
                  width="120px"
                  height="50px"
                  btnColor="yellow"
                  btnHoverColor="orange"
                  textColor="black"
                  fontSize="pc-regular"
                  disabled={isErr || value.length === 0}
                >
                  확인
                </Button>
              )}
            </>
          ) : null}

          {isDone ? (
            <>
              <Done>
                ✨임시비밀번호가 발송되었습니다.✨
                <br />
                이메일을 확인하시고 변경된 임시비밀번호로 로그인해주세요.
              </Done>
              <Button
                className="login-btn"
                onClick={() => {
                  navigate(0);
                }}
                width="120px"
                height="50px"
                btnColor="yellow"
                btnHoverColor="orange"
                textColor="black"
                fontSize="pc-regular"
                disabled={isErr || value.length === 0}
              >
                확인
              </Button>
            </>
          ) : (
            <></>
          )}
        </Wrapper>
      </Modal>
    </>
  );
};

export default FindPassword;
