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
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import InnerContainer from "../InnerContainer/InnerContainer";
import MenuList from "./MenuList";
import LogoutPopup from "./LogoutPopup";
import Avatar from "../Avatar/Avatar";

import accessTokenState from "../../_state/accessTokenState";
import refreshTokenState from "../../_state/refreshTokenState";
import isLoginState from "../../_state/isLoginState";
import userInfoState from "../../_state/userInfoState";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/img/add-icon.svg";
import { ReactComponent as ShopIcon } from "../../assets/img/shop-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/img/logout-icon.svg";
import { ReactComponent as MansaeCat } from "../../assets/img/mansae-cat.svg";
import { ReactComponent as MenuIcon } from "../../assets/img/menu-icon.svg";

import { HeaderBox, LogoBox, SearchBox, SearchInput, MenuBox, LoginBoforeBtn, LoginAfterBtn } from "./style";

interface HeaderProps {
  popupHandler: () => void;
}

const Header = ({ popupHandler }: HeaderProps) => {
  const [menuList, setMenuList] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();

  const handleMenuOn = () => {
    setMenuList(!menuList);
  };

  const handleLogout = () => {
    setLogoutModal(true);
    setAccessToken(null);
    setRefreshToken(null);
    setIsLogin(false);
    setUserInfo({
      userName: "",
      userImg: "",
      userType: "",
    });
    navigate("/");
  };

  return (
    <HeaderBox id="header">
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
            <LoginAfterBtn>
              <AddIcon onClick={popupHandler} />
            </LoginAfterBtn>
            <Link to="/shop">
              <LoginAfterBtn>
                <ShopIcon />
              </LoginAfterBtn>
            </Link>
            <Link to="/mypage">
              <LoginAfterBtn className="user-img">
                <Avatar width="40px" height="40px" bgUrl={userInfo.userImg} />
              </LoginAfterBtn>
            </Link>
            <LoginAfterBtn onClick={handleLogout}>
              <LogoutIcon />
            </LoginAfterBtn>
            <LoginAfterBtn className="menu-icon" onClick={handleMenuOn}>
              <MenuIcon />
            </LoginAfterBtn>
            {menuList ? <MenuList handleMenuOn={handleMenuOn} handleLogout={handleLogout} /> : ""}
          </MenuBox>
        ) : (
          <MenuBox>
            <Link to="/login">
              <LoginBoforeBtn>Login</LoginBoforeBtn>
            </Link>
            <Link to="/signup">
              <LoginBoforeBtn>Signup</LoginBoforeBtn>
            </Link>
          </MenuBox>
        )}
        <LogoutPopup isOn={logoutModal} setIsOn={setLogoutModal} />
      </InnerContainer>
    </HeaderBox>
  );
};

export default Header;
