import { Wrapper, Title, GroupSocialBtn, SocialBtn } from "./style";
import { LoginGoogle } from "../../../api/user";

import { ReactComponent as GoogleIcon } from "../../../assets/img/google-icon.svg";
import { ReactComponent as NaverIcon } from "../../../assets/img/naver-icon.svg";
import { ReactComponent as GithubIcon } from "../../../assets/img/github-icon.svg";

const LoginSocial = () => {
  const onClickGoogle = () => {
    LoginGoogle();
  };

  return (
    <>
      <Wrapper>
        <Title>소셜 로그인</Title>
        <GroupSocialBtn>
          <SocialBtn sort="google" onClick={onClickGoogle}>
            <GoogleIcon />
          </SocialBtn>
          <SocialBtn
            className="prepare"
            sort="naver"
            onClick={() => {
              alert("준비중입니다 🔨");
            }}
          >
            <NaverIcon />
          </SocialBtn>
          <SocialBtn
            className="prepare"
            sort="github"
            onClick={() => {
              alert("준비중입니다 🔨");
            }}
          >
            <GithubIcon />
          </SocialBtn>
        </GroupSocialBtn>
      </Wrapper>
    </>
  );
};

export default LoginSocial;
