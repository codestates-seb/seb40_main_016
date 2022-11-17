import styled from "styled-components";

export const SignupPage = styled.div`
  background-color: var(--color-ivory);

  .conts-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: calc(100vh - var(--header-height));
  }
`;

export const Conts = styled.main`
  width: 100%;
  max-width: 504px;
  margin: 0 auto;
`;

export const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 16px;
  min-height: 300px;
  border-radius: 20px;

  background-color: var(--color-white);
  box-shadow: 0px 5px 10px -3px var(--color-light-black);

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -37%);
    width: 161px;
    height: 161px;
    border-radius: 50%;
    background-color: var(--color-white);
  }

  .signup-btn {
    display: block;
    margin: 0 auto;

    &:active {
      margin: 0 auto;
    }
  }
`;

export const Header = styled.header`
  position: relative;
  text-align: center;
  margin-top: -60px;

  > svg {
    width: 40px;
  }
`;

export const StepNum = styled.div`
  margin: 10px 0;
  color: var(--color-orange);
  font-size: 14px;
  font-weight: bolder;
`;

export const StepDesc = styled.div`
  margin-bottom: 40px;
  font-size: 18px;
`;

export const PrevStepBtn = styled.p`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateX(-5px);
  }

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(180deg);
    path {
      fill: var(--color-orange);
    }
  }
`;

export const Footer = styled.footer`
  padding: 16px;
  margin-top: 25px;
  border-radius: 20px;

  background-color: var(--color-white);
  box-shadow: 0px 5px 10px -3px var(--color-light-black);
  text-align: center;

  a {
    color: var(--color-green);
    text-decoration: none;
    margin-left: 5px;
  }
`;
