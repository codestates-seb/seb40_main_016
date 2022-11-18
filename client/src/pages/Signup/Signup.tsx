import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import StepType from "../../components/SignupTypeStep/StepType";
import StepForm from "../../components/SignupFormStep/StepForm";
import Button from "../../components/Button/Button";
import { SignupPage, Conts, Card, Header, StepNum, StepDesc, Footer, PrevStepBtn } from "./style";

import { ReactComponent as Step01Symbol } from "../../assets/img/finger-one-symbol.svg";
import { ReactComponent as Step02Symbol } from "../../assets/img/finger-two-symbol.svg";
import { ReactComponent as ArrowIcon } from "../../assets/img/arrow-icon.svg";

import { SignupUserInfo } from "../../types/user";

const Signup = () => {
  const [userInfo, setUserInfo] = useState<SignupUserInfo>({
    userName: "",
    email: "",
    password: "",
    content: "",
    userType: "",
    userBirth: "",
    userGender: "male",
  });
  const [step, setStep] = useState<number>(1);
  const [hasNoError, setHasNoError] = useState<boolean>(false); //error 메세지 난 것 없는지
  const [hasNoEmptyRequired, setHasNoEmptyRequired] = useState<boolean>(false); //빈 인풋 있는지

  interface Check {
    requiredField: string[];
    userInfo: SignupUserInfo;
  }
  const checkAllWritten = ({ requiredField, userInfo }: Check) => {
    const EmptyArr: string[] = requiredField.filter((el) => {
      return userInfo[el].length === 0;
    });
    return EmptyArr.length < 1;
  };

  const onFormChange = () => {
    let requiredField: string[] = ["userName", "email", "password"];
    setHasNoEmptyRequired(checkAllWritten({ requiredField, userInfo }));
  };

  const onSubmitClick = (e: any) => {
    e.preventDefault();
    console.log("제출");
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <SignupPage>
        <OuterContainer>
          <InnerContainer className="conts-wrapper">
            <Conts>
              <Card>
                <Header>
                  {step === 1 ? (
                    <>
                      <Step01Symbol></Step01Symbol>
                      <StepNum>step01</StepNum>
                      <StepDesc>종을 골라주세요</StepDesc>
                    </>
                  ) : (
                    <>
                      <PrevStepBtn>
                        <ArrowIcon onClick={() => setStep(1)}></ArrowIcon>
                      </PrevStepBtn>
                      <Step02Symbol></Step02Symbol>
                      <StepNum>step02</StepNum>
                      <StepDesc>정보를 입력해주세요</StepDesc>
                    </>
                  )}
                </Header>
                {step === 1 ? (
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
                      isShadow={true}
                      disabled={userInfo.userType === ""}
                    >
                      다음
                    </Button>
                  </>
                ) : (
                  <>
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
                        isShadow={true}
                        disabled={!(hasNoError && hasNoEmptyRequired)}
                      >
                        완료
                      </Button>
                    </form>
                  </>
                )}
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
