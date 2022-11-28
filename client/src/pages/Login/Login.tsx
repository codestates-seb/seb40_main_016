import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import { useSetRecoilState } from "recoil";
import isLoginState from "../../_state/isLoginState";
import accessTokenState from "../../_state/accessTokenState";
import refreshTokenState from "../../_state/refreshTokenState";
import userInfoState from "../../_state/userInfoState";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import LoginSlider from "../../components/Login/LoginSlider/LoginSlider";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import LoginSocial from "../../components/Login/LoginSocial/LoginSocial";
import Button from "../../components/Button/Button";
import FindPassword from "../../components/Login/FindPassword/FindPassword";
import { LoginPage, Conts, AreaSlider, AreaForm, FormCard, ForgotIdPw, Footer } from "./style";
import { PostLogin, GetUserInfo } from "../../api/user";

import { LoginInfo } from "../../types/user";

const Login = () => {
  const setIsLogin = useSetRecoilState(isLoginState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지
  const [isFindPwOn, setIsFindPwOn] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginInfo.email !== "" && loginInfo.password !== "") {
      setHasNoEmptyRequired(true);
    } else {
      setHasNoEmptyRequired(false);
    }
  }, [loginInfo]);

  useEffect(() => {
    if (isFindPwOn) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: hidden;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [isFindPwOn]);

  const onSubmitClick = (e: any) => {
    e.preventDefault();
    PostLogin(loginInfo)
      .then((res: any) => {
        if (res.status === 200 && res.headers.authorization) {
          setAccessToken(res.headers.authorization);
          setRefreshToken(res.headers.refresh);
          return res.headers.authorization;
        }
      })
      .then((token) => {
        const info: any = jwt(token.split(" ")[1]);
        GetUserInfo(info.userId)
          .then((res) => {
            const data = res.data.data;
            setIsLogin(true);
            setUserInfo({
              userId: data.userId,
              userName: data.userName,
              userImg: data.userImg,
              userType: data.userType,
            });
          })
          .then(() => {
            navigate("/");
            navigate(0);
          })
          .catch((e) => {
            alert("회원 정보를 가져오는 데에 실패했습니다! 😿");
          });
      })
      .catch((e) => {
        alert("로그인에 실패하셨습니다! 아이디와 비밀번호를 다시 확인해 주세요! 😿");
      });
  };

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
                    <ForgotIdPw
                      onClick={() => {
                        setIsFindPwOn(true);
                      }}
                    >
                      <span>비밀번호 찾기</span>
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
      <FindPassword isOn={isFindPwOn} setIsOn={setIsFindPwOn} />
    </>
  );
};

export default Login;
