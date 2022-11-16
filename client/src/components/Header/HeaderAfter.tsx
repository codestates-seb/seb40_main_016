/*
담당 : 송인선
생성 : 2022.11.15
수정 : -
소개 : 헤더 컴포넌트 (로그인 후)
설명 : 
  - 페이지에서 공통적으로 사용되는 헤더 컴포넌트입니다.
  - 현 단계에서는 타입 적용할 부분이 없었습니다.
  - 반응형 적용
*/

import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/img/add-icon.svg";
import { ReactComponent as ShopIcon } from "../../assets/img/shop-icon.svg";
import { ReactComponent as MyIcon } from "../../assets/img/my-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/img/logout-icon.svg";
import { ReactComponent as MansaeCat } from "../../assets/img/mansae-cat.svg";
import { ReactComponent as MenuIcon } from "../../assets/img/menu-icon.svg";
import InnerContainer from "../InnerContainer/InnerContainer";

const Header = styled.div`
  position: fixed;
  width: 100%;
  height: var(--header-height);
  box-shadow: 0px 0px 10px -3px var(--color-light-black);

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

const FadeIn = (from: string, to: string) => keyframes`
  from {
    transform: ${from};
  }
  to {
    transform: ${to};
  }
`;

const LogoBox = styled.div`
  position: relative;

  @media screen and (max-width: 736px) {
    width: 100px;
  }

  .logo {
    width: 200px;
    height: 80px;
    animation: ${FadeOut("0", "1")} 1s ease-in-out forwards;

    @media screen and (max-width: 736px) {
      animation: ${FadeOut("1", "0")} 0.3s ease-in-out forwards;
    }
  }

  .logo-responsive {
    position: absolute;
    top: 20px;
    left: 0px;
    width: 80px;
    height: 40px;
    animation: ${FadeIn("scale(1)", "scale(0)")} 0.5s ease-in-out forwards;

    @media screen and (max-width: 736px) {
      animation: ${FadeIn("scale(0)", "scale(1)")} 0.5s ease-in-out forwards;
    }
  }
`;

const SearchBox = styled.form`
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

const SearchInput = styled.input`
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

const MenuBox = styled.div`
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
    animation: ${FadeIn("scale(1)", "scale(0)")} 0.5s ease-in-out forwards;

    @media screen and (max-width: 736px) {
      animation: ${FadeIn("scale(0)", "scale(1)")} 0.5s ease-in-out forwards;
    }
  }
`;

const Btn = styled.button`
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

const HeaderAfter = () => {
  return (
    <Header>
      <InnerContainer className="inner">
        <LogoBox>
          <Logo className="logo" />
          <MansaeCat className="logo-responsive" />
        </LogoBox>
        <SearchBox>
          <SearchIcon className="search-icon" />
          <SearchInput type="text" placeholder="search..." />
        </SearchBox>
        <MenuBox>
          <Btn>
            <AddIcon />
          </Btn>
          <Btn>
            <ShopIcon />
          </Btn>
          <Btn>
            <MyIcon />
          </Btn>
          <Btn>
            <LogoutIcon />
          </Btn>
          <Btn className="menu-icon">
            <MenuIcon />
          </Btn>
        </MenuBox>
      </InnerContainer>
    </Header>
  );
};

export default HeaderAfter;
