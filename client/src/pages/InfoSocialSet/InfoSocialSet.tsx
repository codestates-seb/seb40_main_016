import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SocialForm from "../../components/SocialForm/SocialForm";
import Button from "../../components/Button/Button";
import { PostSocialInfo } from "../../api/user";

import isLoginState from "../../_state/isLoginState";
import accessTokenState from "../../_state/accessTokenState";
import userInfoState from "../../_state/userInfoState";

import { SocialPage, Conts, Card, Header, StepNum, StepDesc } from "./style";
import { ReactComponent as Step02Symbol } from "../../assets/img/finger-two-symbol.svg";

import { SignupUserInfo } from "../../types/user";

interface Check {
  requiredField: string[];
  userInfo: SignupUserInfo;
}

const InfoSocialSet = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setMyInfo = useSetRecoilState(userInfoState);
  const [userInfo, setUserInfo] = useState<SignupUserInfo>({
    userName: "",
    email: "",
    password: "",
    userType: "",
    userBirth: "",
    userGender: "MALE",
  });
  const [hasNoError, setHasNoError] = useState<boolean>(false); //error 메세지 난 것 없는지
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지
  const [tokenCatched, setTokenCatched] = useState<string>("");

  const token: string | null = new URL(window.location.href).searchParams.get("accessToken");

  useEffect(() => {
    const tokenStr: string = "Bearer " + token;
    setTokenCatched(tokenStr);
  }, [token]);

  const checkAllWritten = ({ requiredField, userInfo }: Check) => {
    const EmptyArr: string[] = requiredField.filter((el) => {
      return userInfo[el].length === 0;
    });
    return EmptyArr.length < 1;
  };

  const onFormChange = () => {
    let requiredField: string[] = ["userType", "userName", "password"];
    setHasNoEmptyRequired(checkAllWritten({ requiredField, userInfo }));
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAccessToken(tokenCatched);

    let body;
    if (userInfo.userType === "PERSON") {
      body = {
        userName: userInfo.userName,
        email: userInfo.email,
        password: userInfo.password,
        userType: userInfo.userType,
      };
    } else {
      body = userInfo;
    }

    PostSocialInfo(body, token)
      .then((res) => {
        const data = res.data.data;
        setIsLogin(true);
        setMyInfo({
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
  };

  useEffect(() => {
    const header = document.querySelector("#header") as HTMLElement;
    const footer = document.querySelector("#footer") as HTMLElement;
    header.style.display = "none";
    footer.style.display = "none";
  }, []);

  return (
    <>
      <SocialPage>
        <OuterContainer className="no-header">
          <InnerContainer className="conts-wrapper">
            <Conts>
              <form onChange={onFormChange} onSubmit={onSubmit}>
                <Card>
                  <Header>
                    <Step02Symbol></Step02Symbol>
                    <StepNum>거의 다 됐어요.</StepNum>
                    <StepDesc>
                      이용에 필요한 <br />
                      필수 추가 정보를 입력해주세요.
                    </StepDesc>
                  </Header>
                  <SocialForm userInfo={userInfo} setUserInfo={setUserInfo} setHasNoError={setHasNoError} />
                  <Button
                    className="done-btn"
                    onClick={() => {}}
                    width="200px"
                    height="50px"
                    btnColor="yellow"
                    btnHoverColor="orange"
                    textColor="black"
                    fontSize="pc-regular"
                    disabled={!(hasNoError && hasNoEmptyRequired)}
                  >
                    확인
                  </Button>
                </Card>
              </form>
            </Conts>
          </InnerContainer>
        </OuterContainer>
      </SocialPage>
    </>
  );
};

export default InfoSocialSet;
