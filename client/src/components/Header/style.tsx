import styled, { keyframes } from "styled-components";

export const Header = styled.div`
  position: fixed;
  width: 100%;
  background-color: var(--color-white);
  height: var(--header-height);
  box-shadow: 0px 0px 10px -3px var(--color-light-black);
  z-index: 2;

  .inner {
    display: flex;
    align-items: center;
  }
`;

const FadeOut = (from: string, to: string) => keyframes`
  from {
    opacity: ${from};
  }
  to {
    opacity: ${to};
  }
`;

export const LogoBox = styled.div`
  position: relative;

  @media screen and (max-width: 736px) {
    width: 100px;
  }

  .logo {
    width: 200px;
    height: 80px;

    @media screen and (max-width: 736px) {
      opacity: 0;
    }
  }

  .logo-responsive {
    position: absolute;
    top: 20px;
    left: 0px;
    width: 80px;
    height: 40px;
    opacity: 0;

    @media screen and (max-width: 736px) {
      opacity: 1;
    }
  }
`;

export const SearchBox = styled.form`
  margin: 0px 50px 0px;
  width: 80%;
  border: 2px solid var(--color-gray);
  position: relative;
  border-radius: 10px;

  .search-icon {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 25px;
    fill: var(--color-gray);
  }
`;

export const SearchInput = styled.input`
  width: 60%;
  margin-left: 45px;
  height: 35px;
  border: none;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: var(--color-gray);
  }
`;

export const MenuBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;

  .menu-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: none;

    @media screen and (max-width: 736px) {
      display: visible;
    }
  }
`;

const Small = (from: string, to: string, fontSmall: string, fontXSmall: string) => keyframes`
  from {
    width: ${from};
    height: ${from};
    font-size: ${fontSmall};
  }
  to {
    width: ${to};
    height: ${to};
    font-size: ${fontXSmall};
  }
`;

export const LoginBeforeBtn = styled.button`
  margin: 0px 20px 0px 0px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--color-white);
  border: none;
  flex-shrink: 0;
  animation: ${FadeOut("0", "1")} 1s ease-in-out forwards;

  @media screen and (max-width: 736px) {
    animation: ${FadeOut("1", "0")} 0.3s ease-in-out forwards;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s;
  }
`;

export const LoginAfterBtn = styled.button`
  margin: 0px 16px 0px 0px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: var(--color-white);
  font-size: var(--fs-pc-small);
  color: var(--color-black);
  border: none;
  flex-shrink: 0;
  animation: ${Small("45px", "60px", "var(--fs-pc-xsmall)", "var(--fs-pc-small)")} 0.5s ease-in-out forwards;

  @media screen and (max-width: 736px) {
    display: none;
    animation: ${Small("60px", "45px", "var(--fs-pc-small)", "var(--fs-pc-xsmall)")} 0.5s ease-in-out forwards;
  }

  &:hover {
    background-color: var(--color-ivory);
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s;
  }
`;
