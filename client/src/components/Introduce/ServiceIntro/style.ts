import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  font-size: var(--fs-pc-large);
  line-height: 40px;
`;

export const Title = styled.h2`
  padding-bottom: 40px;
  font-size: 28px;
  font-family: TmoneyRoundWindExtraBold;
`;

export const IntroWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
  padding-top: 60px;
  padding-left: 30px;

  img {
    max-width: 350px;
    object-fit: cover;
  }

  @media screen and (max-width: 736px) {
    flex-direction: column;
    align-items: center;
    padding-left: 0;
  }
`;

export const Intro = styled.div`
  padding-bottom: 40px;
`;

export const Section = styled.section`
  background-color: var(--color-faded-yellow);
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &.white {
    background-color: var(--color-white);
  }
`;

export const DescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1264px;

  img {
    max-width: 400px;
    object-fit: cover;
    margin-right: 60px;
    padding-top: 20px;
  }

  @media screen and (max-width: 736px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      margin-right: 0;
    }
  }
`;

export const Desc = styled.p`
  width: 100%;
  max-width: 1264px;
  padding: 100px 0;

  @media screen and (max-width: 736px) {
    padding: 40px 0;
  }
`;

export const StepWrapper = styled.div`
  width: 100%;
  max-width: 1264px;
  padding: 50px 0;

  @media screen and (max-width: 736px) {
    padding: 100px;
    width: 80%;
  }
`;

export const StepTitle = styled.h3`
  padding-bottom: 40px;
  font-size: 24px;
  font-family: TmoneyRoundWindExtraBold;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 20px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  svg {
    max-width: 50px;
    padding-left: 20px;
  }

  p {
    margin-left: 30px;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  background-color: var(--color-faded-yellow);
  padding-top: 20px;
  padding-bottom: 60px;

  @media screen and (max-width: 736px) {
    padding-bottom: 130px;
  }
`;
