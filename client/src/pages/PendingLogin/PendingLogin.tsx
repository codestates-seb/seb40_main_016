import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { useSetRecoilState } from "recoil";

import Loading from "../../components/Loading/Loading";

import isLoginState from "../../_state/isLoginState";
import accessTokenState from "../../_state/accessTokenState";
import userInfoState from "../../_state/userInfoState";

import { Wrapper } from "./styled";
import { GetUserInfo } from "../../api/user";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [tokenCatched, setTokenCatched] = useState<string>("");

  const token: string | null = new URL(window.location.href).searchParams.get("accessToken");
  const sign: string | null = new URL(window.location.href).searchParams.get("sign");
  const info: string | null = new URL(window.location.href).searchParams.get("info");

  useEffect(() => {
    const tokenStr: string = "Bearer " + token;
    setTokenCatched(tokenStr);
  }, [token]);

  useEffect(() => {
    setAccessToken(tokenCatched);
    const passedData: any = jwt(token);
    const userId = passedData.userId;

    if (sign === "1" && info === "1") {
      GetUserInfo(userId)
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
        })
        .catch((e) => {
          alert("회원 정보를 가져오는 데에 실패했습니다! 😿");
        });
    } else if (info === "0") {
      navigate(`/social?accessToken=${token}`);
    }
  }, [tokenCatched]);

  useEffect(() => {
    const header = document.querySelector("#header") as HTMLElement;
    const footer = document.querySelector("#footer") as HTMLElement;
    header.style.display = "none";
    footer.style.display = "none";
  }, []);

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};

export default GoogleLogin;
