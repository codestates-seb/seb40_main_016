import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import LoginSlider from "../../components/LoginSlider/LoginSlider";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginSocial from "../../components/LoginSocial/LoginSocial";
import Button from "../../components/Button/Button";
import { LoginPage, Conts, AreaSlider, AreaForm, FormCard, ForgotIdPw, Footer } from "./style";

import { LoginInfo } from "../../types/user";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지

  useEffect(() => {
    if (loginInfo.email !== "" && loginInfo.password !== "") {
      setHasNoEmptyRequired(true);
    } else {
      setHasNoEmptyRequired(false);
    }
  }, [loginInfo]);

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
                  <form>
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
