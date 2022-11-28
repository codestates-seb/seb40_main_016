import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import StepType from "../../components/Signup/SignupTypeStep/StepType";
import StepForm from "../../components/Signup/SignupFormStep/StepForm";
import StepSuccess from "../../components/Signup/SignupSuccessStep/StepSucess";
import Button from "../../components/Button/Button";
import { SignupPage, Conts, Card, Header, StepNum, StepDesc, Footer, PrevStepBtn, Notice } from "./style";
import { PostSignUp } from "../../api/user";

import { ReactComponent as Step01Symbol } from "../../assets/img/finger-one-symbol.svg";
import { ReactComponent as Step02Symbol } from "../../assets/img/finger-two-symbol.svg";
import { ReactComponent as Step03Symbol } from "../../assets/img/finger-three-symbol.svg";
import { ReactComponent as ArrowIcon } from "../../assets/img/arrow-icon.svg";

import { SignupUserInfo } from "../../types/user";

interface Check {
  requiredField: string[];
  userInfo: SignupUserInfo;
}

const Signup = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<SignupUserInfo>({
    userName: "",
    email: "",
    password: "",
    userType: "",
    userBirth: "",
    userGender: "MALE",
  });
  const [step, setStep] = useState<number>(1);
  const [hasNoError, setHasNoError] = useState<boolean>(false); //error 메세지 난 것 없는지
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지
  const [alreadyExistError, setAlreadyExistError] = useState<boolean>(false);

  const checkAllWritten = ({ requiredField, userInfo }: Check) => {
    const EmptyArr: string[] = requiredField.filter((el) => {
      return userInfo[el].length === 0;
    });
    return EmptyArr.length < 1;
  };

  const onFormChange = () => {
    let requiredField: string[] = ["userName", "email", "password"];
    setHasNoEmptyRequired(checkAllWritten({ requiredField, userInfo }));
    if (alreadyExistError) {
      setAlreadyExistError(false);
    }
  };

  const onSubmitClick = (e: any) => {
    e.preventDefault();
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

    PostSignUp(body)
      .then((res: any) => {
        if (res.status === 201) {
          setStep(3);
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          setAlreadyExistError(true);
        }
      });
  };

  return (
    <>
      <SignupPage>
        <OuterContainer>
          <InnerContainer className="conts-wrapper">
            <Conts>
              <Card>
                <Header>
                  {(() => {
                    switch (step) {
                      case 1:
                        return (
                          <>
                            <Step01Symbol></Step01Symbol>
                            <StepNum>step01</StepNum>
                            <StepDesc>종을 골라주세요</StepDesc>
                          </>
                        );
                      case 2:
                        return (
                          <>
                            <PrevStepBtn>
                              <ArrowIcon onClick={() => setStep(1)}></ArrowIcon>
                            </PrevStepBtn>
                            <Step02Symbol></Step02Symbol>
                            <StepNum>step02</StepNum>
                            <StepDesc>정보를 입력해주세요</StepDesc>
                          </>
                        );
                      case 3:
                        return (
                          <>
                            <Step03Symbol></Step03Symbol>
                            <StepNum>Success</StepNum>
                            <StepDesc>가입성공</StepDesc>
                          </>
                        );
                      default:
                        return "";
                    }
                  })()}
                </Header>
                {(() => {
                  switch (step) {
                    case 1:
                      return (
                        <>
                          <StepType userInfo={userInfo} setUserInfo={setUserInfo} />
                          <Button
                            className="signup-btn"
                            onClick={() => {
                              setStep(2);
                            }}
                            width="200px"
                            height="50px"
                            btnColor="yellow"
                            btnHoverColor="orange"
                            textColor="black"
                            fontSize="pc-regular"
                            disabled={userInfo.userType === ""}
                          >
                            다음
                          </Button>
                        </>
                      );
                    case 2:
                      return (
                        <form onChange={onFormChange} onSubmit={onSubmitClick}>
                          <StepForm userInfo={userInfo} setUserInfo={setUserInfo} setHasNoError={setHasNoError} />
                          <Button
                            className="signup-btn"
                            onClick={() => {}}
                            width="200px"
                            height="50px"
                            btnColor="yellow"
                            btnHoverColor="orange"
                            textColor="black"
                            fontSize="pc-regular"
                            disabled={!(hasNoError && hasNoEmptyRequired)}
                          >
                            완료
                          </Button>
                        </form>
                      );
                    case 3:
                      return (
                        <>
                          <StepSuccess />
                          <Button
                            className="signup-btn"
                            onClick={() => {
                              navigate("/login");
                            }}
                            width="200px"
                            height="50px"
                            btnColor="yellow"
                            btnHoverColor="orange"
                            textColor="black"
                            fontSize="pc-regular"
                          >
                            확인
                          </Button>
                        </>
                      );
                    default:
                      return "";
                  }
                })()}
                {alreadyExistError ? <Notice>이미 존재하는 회원입니다. 다시 확인해 주세요!</Notice> : ""}
              </Card>
              <Footer>
                계정이 있으신가요?
                <Link to="/login">로그인</Link>
              </Footer>
            </Conts>
          </InnerContainer>
        </OuterContainer>
      </SignupPage>
    </>
  );
};

export default Signup;
