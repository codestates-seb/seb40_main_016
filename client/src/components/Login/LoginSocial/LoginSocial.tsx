import { Wrapper, GroupSocialBtn, SocialBtn } from "./style";
import { LoginGoogle } from "../../../api/user";

import { ReactComponent as GoogleIcon } from "../../../assets/img/google-icon.svg";

const LoginSocial = () => {
  const onClickGoogle = () => {
    LoginGoogle();
  };

  return (
    <>
      <Wrapper>
        <GroupSocialBtn>
          <SocialBtn sort="google" onClick={onClickGoogle}>
            <GoogleIcon />
            <span>구글 로그인</span>
          </SocialBtn>
        </GroupSocialBtn>
      </Wrapper>
    </>
  );
};

export default LoginSocial;
