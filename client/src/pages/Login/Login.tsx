import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import LoginSlider from "../../components/Login/LoginSlider/LoginSlider";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import LoginSocial from "../../components/Login/LoginSocial/LoginSocial";
import Button from "../../components/Button/Button";
import { LoginPage, Conts, AreaSlider, AreaForm, FormCard, ForgotIdPw, Footer } from "./style";
import { PostLogin } from "../../api/user";

import { LoginInfo } from "../../types/user";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (loginInfo.email !== "" && loginInfo.password !== "") {
      setHasNoEmptyRequired(true);
    } else {
      setHasNoEmptyRequired(false);
    }
  }, [loginInfo]);

  const onSubmitClick = (e: any) => {
    e.preventDefault();
    PostLogin(loginInfo)
      .then((res: any) => {
        if (res.status === 200) {
          console.log(`res.headers.authorization : ${res.headers.authorization}`); //접근안되는 에러 발생중
          console.log("로그인 성공");
          if (res.headers.authorization) {
            localStorage.setItem("accessToken", res.headers.authorization);
            localStorage.setItem("refreshToken", res.headers.refresh);
          }
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          console.log(e);
        }
      });
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <>
      <LoginPage>
        <OuterContainer>
          <InnerContainer className="conts-wrapper">
            <Conts>
              <AreaSlider>
                <LoginSlider />
              </AreaSlider>
              <AreaForm>
                <FormCard>
                  <form onSubmit={onSubmitClick}>
                    <LoginForm loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
                    <Button
                      className="login-btn"
                      onClick={() => {}}
                      width="100%"
                      height="50px"
                      btnColor="yellow"
                      btnHoverColor="orange"
                      textColor="black"
                      fontSize="pc-regular"
                      disabled={!hasNoEmptyRequired}
                    >
                      로그인
                    </Button>
                    <LoginSocial />
                    <ForgotIdPw>
                      <span>아이디/비밀번호 찾기</span>
                    </ForgotIdPw>
                  </form>
                </FormCard>
                <Footer>
                  계정이 없으신가요?
                  <Link to="/signup">화원가입</Link>
                </Footer>
              </AreaForm>
            </Conts>
          </InnerContainer>
        </OuterContainer>
      </LoginPage>
    </>
  );
};

export default Login;
