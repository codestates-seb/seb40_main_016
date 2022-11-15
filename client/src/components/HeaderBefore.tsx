/*
담당 : 송인선
생성 : 2022.11.15
수정 : -
소개 : 헤더 컴포넌트 (로그인 전)
설명 : 
  - 페이지에서 공통적으로 사용되는 헤더 컴포넌트입니다.
  - 현 단계에서는 타입 적용할 부분이 없었습니다.
*/

import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { ReactComponent as SearchIcon } from "../assets/img/search-icon.svg";
import InnerContainer from "./InnerContainer/InnerContainer";

const Header = styled.div`
  height: var(--header-height);
  box-shadow: 0px 0px 10px -3px var(--color-light-black);

  .inner {
    display: flex;
    align-items: center;
  }
`;

const LogoBox = styled.div`
  width: 200px;

  .logo {
    width: 200px;
    height: 80px;
  }
`;

const SearchBox = styled.form`
  margin: 0px 50px 0px;
  width: 80%;
  border: 1px solid var(--color-gray);
  position: relative;
  border-radius: 10px;

  .searchicon {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 25px;
    fill: var(--color-gray);
  }
`;

const SearchInput = styled.input`
  width: 80%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const Btn = styled.button`
  margin: 0px 16px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  font-size: var(--fs-pc-small);
  color: var(--color-black);
  border: 1px solid var(--color-black);
  border: none;

  &:hover {
    background-color: var(--color-ivory);
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s;
  }
`;

function HeaderBefore() {
  return (
    <Header>
      <InnerContainer className="inner">
        <LogoBox>
          <Logo className="logo" />
        </LogoBox>
        <SearchBox>
          <SearchIcon className="searchicon" />
          <SearchInput type="text" placeholder="search..." />
        </SearchBox>
        <MenuBox>
          <Btn>Login</Btn>
          <Btn>Signup</Btn>
        </MenuBox>
      </InnerContainer>
    </Header>
  );
}

export default HeaderBefore;
