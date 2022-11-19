import styled, { css } from "styled-components";

export const LoginPage = styled.div`
  background-color: var(--color-ivory);

  .conts-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
    padding-bottom: 100px;
    min-height: calc(100vh - var(--header-height));
  }
`;

export const Conts = styled.main`
  display: flex;
  gap: 2vw;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ShadowRoundCard = styled.div`
  background-color: var(--color-white);
  box-shadow: 0px 5px 10px -3px var(--color-light-black);
  border-radius: 20px;
`;

export const AreaSlider = styled(ShadowRoundCard)`
  display: none;
  min-height: 300px;

  @media screen and (min-width: 736px) {
    display: block;
    width: 50%;
  }
`;

export const AreaForm = styled.div`
  width: 100%;
  min-height: 300px;
  border-radius: 20px;

  @media screen and (min-width: 736px) {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
`;

export const FormCard = styled(ShadowRoundCard)`
  padding: 30px 16px 10px 16px;

  @media screen and (min-width: 736px) {
    height: 100%;
  }

  .login-btn {
    display: block;
    margin: 0 auto;

    &:active {
      margin: 0 auto;
    }
  }
`;

export const ForgotIdPw = styled.p`
  margin: 30px auto 20px auto;
  text-align: center;

  span {
    color: var(--color-green);
    cursor: pointer;

    &:hover {
      color: var(--color-dark-green);
    }
  }
`;

export const Footer = styled(ShadowRoundCard)`
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

    &:hover {
      color: var(--color-dark-green);
    }
  }
`;
