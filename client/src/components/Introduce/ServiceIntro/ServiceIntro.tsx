import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import JSConfetti from "js-confetti";

import Button from "../../Button/Button";

import { ReactComponent as Step01Symbol } from "../../../assets/img/finger-one-symbol.svg";
import { ReactComponent as Step02Symbol } from "../../../assets/img/finger-two-symbol.svg";
import { ReactComponent as Step03Symbol } from "../../../assets/img/finger-three-symbol.svg";

import {
  Wrapper,
  Title,
  IntroWrapper,
  Intro,
  Section,
  Background,
  DescWrapper,
  Desc,
  StepWrapper,
  StepTitle,
  Step,
  ButtonWrapper,
} from "./style";

const ServiceIntro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    const confetti = new JSConfetti();
    confetti.addConfetti();
  }, []);

  return (
    <>
      <Wrapper>
        <IntroWrapper data-aos="fade-left" data-aos-duration="1000">
          <Intro>
            <Title>내 밥은 내가 번다냥!</Title>
            <p>
              너무 귀여운 우리의 반려동물,
              <br />
              하지만 각종 간식과 사료, 장난감 값은 조금 부담스러우시다면?
              <br />
              내 반려 동물 자랑하고 사료값도 벌 수 있어요
              <br />
              이제 &quot;내 밥은 내가번다냥&quot;
            </p>
          </Intro>
          <img src="./assets/user-clipart.png" alt="intro-img" />
        </IntroWrapper>
        <Section>
          <Background>
            <DescWrapper data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
              <img src="./assets/cat-selfie-clipart.png" alt="intro-img" />
              <Desc>
                😺
                <br />
                동물 계정으로 가입해 사진을 올리고 좋아요와 간식을 받아보세요!
                <br />
                간식을 모으면 상점에서 간식과 물품을 교환할 수 있습니다.
              </Desc>
            </DescWrapper>
          </Background>
          <Background className="white">
            <DescWrapper data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="500">
              <Desc>
                🧑
                <br />
                사람 계정으로 가입해 좋아하는 동물에게 간식을 선물해보세요!
                <br />
                좋아하는 동물에게 실제 간식과 교환할 수 있는 알을 선물할 수 있습니다.
              </Desc>
              <img src="./assets/dog-with-snack-clipart.png" alt="intro-img" />
            </DescWrapper>
          </Background>
          <Background>
            <StepWrapper data-aos="fade-right" data-aos-duration="1000">
              <StepTitle>내 밥은 내가 번다냥! 이용 가이드</StepTitle>
              <Step>
                <Step01Symbol />
                <p>첫째. 계정을 가입하고 로그인하세요</p>
              </Step>
              <Step>
                <Step02Symbol />
                <p>둘째. 가입된 계정으로 나의 반려동물 사진을 올려주세요</p>
              </Step>
              <Step>
                <Step03Symbol />
                <p>셋째. 업로드한 사진으로 받은 간식을 상점에서 반려동물 물품과 교환하세요</p>
              </Step>
            </StepWrapper>
          </Background>
        </Section>
        <ButtonWrapper>
          <Button
            onClick={() => {
              navigate("/");
            }}
            width="250px"
            height="60px"
            btnColor="yellow"
            btnHoverColor="orange"
            fontSize="pc-large"
            isShadow={true}
          >
            시작하기
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default ServiceIntro;
