/*
담당 : 송인선
생성 : 2022.11.23
수정 : -
소개 : 헤더 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 헤더 컴포넌트입니다.
  - 현 단계에서는 타입 적용할 부분이 없었습니다.
  - 반응형 적용
  - 라우터 연결
  - headerBefore, headerAfter로 나뉜 파일을 병합했습니다.
  - 로그인 전역 상태관리 적용하여 로그인 전, 후로 나타나는 아이콘이 달라집니다.
  - 부자연스러운 애니메이션 삭제
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import InnerContainer from "../InnerContainer/InnerContainer";
import MenuList from "./MenuList";

import accessTokenState from "../../_state/accessTokenState";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/img/add-icon.svg";
import { ReactComponent as ShopIcon } from "../../assets/img/shop-icon.svg";
import { ReactComponent as MyIcon } from "../../assets/img/my-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/img/logout-icon.svg";
import { ReactComponent as MansaeCat } from "../../assets/img/mansae-cat.svg";
import { ReactComponent as MenuIcon } from "../../assets/img/menu-icon.svg";

import isLoginState from "../../_state/isLoginState";

import { Header, LogoBox, SearchBox, SearchInput, MenuBox, LoginBeforeBtn, LoginAfterBtn } from "./style";

interface HeaderProps {
  popupHandler: () => void;
}

const HeaderAfter = ({ popupHandler }: HeaderProps) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [token, setToken] = useRecoilState(accessTokenState);

  const handleMenuOn = () => {
    setIsOn(!isOn);
  };

  const handleLogout = () => {
    setToken(null);
    setLogoutModal(!logoutModal);
    setIsLogin(false);
  };

  return (
    <Header>
      <InnerContainer className="inner">
        <LogoBox>
          <Link to="/">
            <Logo className="logo" />
          </Link>
          <Link to="/">
            <MansaeCat className="logo-responsive" />
          </Link>
        </LogoBox>
        <SearchBox>
          <SearchIcon className="search-icon" />
          <SearchInput type="text" placeholder="search..." />
        </SearchBox>
        {isLogin ? (
          <MenuBox>
            <LoginBeforeBtn>
              <AddIcon onClick={popupHandler} />
            </LoginBeforeBtn>
            <Link to="/shop">
              <LoginBeforeBtn>
                <ShopIcon />
              </LoginBeforeBtn>
            </Link>
            <Link to="/mypage">
              <LoginBeforeBtn>
                <MyIcon />
              </LoginBeforeBtn>
            </Link>
            <LoginBeforeBtn>
              <LogoutIcon onClick={handleLogout} />
            </LoginBeforeBtn>
            <LoginBeforeBtn className="menu-icon" onClick={handleMenuOn}>
              <MenuIcon />
            </LoginBeforeBtn>
            {isOn ? <MenuList handleMenuOn={handleMenuOn}></MenuList> : ""}
          </MenuBox>
        ) : (
          <MenuBox>
            <Link to="/login">
              <LoginAfterBtn>Login</LoginAfterBtn>
            </Link>
            <Link to="/signup">
              <LoginAfterBtn>Signup</LoginAfterBtn>
            </Link>
          </MenuBox>
        )}
      </InnerContainer>
    </Header>
  );
};

export default HeaderAfter;
