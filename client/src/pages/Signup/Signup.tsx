import React, { useState } from "react";
import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import { ReactComponent as Step01Symbol } from "../../assets/img/finger-one-symbol.svg";
import { ReactComponent as Step02Symbol } from "../../assets/img/finger-two-symbol.svg";
import { ReactComponent as ArrowIcon } from "../../assets/img/arrow-icon.svg";
import { SignupPage, Conts, Card, Header, StepNum, StepDesc, Footer, PrevStepBtn } from "./style";
import StepType from "../../components/SignupTypeStep/StepType";
import StepForm from "../../components/SignupFormStep/StepForm";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

const Signup = () => {
  interface UserInfo {
    userName: string;
    email: string;
    password: string;
    content: string;
    userType: string;
    userBirth: string;
    userGender: string;
  }
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [step, setStep] = useState<number>(2);
  const [isPopup, setIsPopup] = useState<boolean>(true);

  return (
    <>
      <Modal
        maxWidth="700px"
        title="제목"
        bg={true}
        isOn={isPopup}
        setIsOn={setIsPopup}
        onTitleBtnClick={() => setStep(1)}
        titleBtn="more"
      >
        <p>내용</p>
      </Modal>
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
                    {" "}
                    <StepType></StepType>{" "}
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
                    >
                      다음
                    </Button>
                  </>
                ) : (
                  <StepForm></StepForm>
                )}
              </Card>
              <Footer></Footer>
            </Conts>
          </InnerContainer>
        </OuterContainer>
      </SignupPage>
    </>
  );
};

export default Signup;
