import { Dispatch, SetStateAction, ChangeEvent } from "react";
import Input from "../../Input/Input";

import { Wrapper } from "./style";
import { LoginInfo } from "../../../types/user";

interface Prop {
  loginInfo: LoginInfo;
  setLoginInfo: Dispatch<SetStateAction<LoginInfo>>;
}

const LoginForm = ({ loginInfo, setLoginInfo }: Prop) => {
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, email: e.target.value });
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
  };

  return (
    <>
      <Wrapper>
        <Input
          type="text"
          value={loginInfo.email}
          placeholder="이메일을 입력하세요"
          onChange={onChangeEmail}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="이메일"
        />
        <Input
          type="password"
          value={loginInfo.password}
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
          height="50px"
          inputColor="ivory"
          fontSize="pc-regular"
          label="비밀번호"
        />
      </Wrapper>
    </>
  );
};

export default LoginForm;
