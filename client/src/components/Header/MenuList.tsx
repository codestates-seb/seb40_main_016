/*
담당 : 송인선
생성 : 2022.11.16
수정 : -
소개 : 반응형 적용 시 메뉴 리스트 컴포넌트
설명 : 
  - 로그인 후, 웹페이지가 작아졌을 때 헤더에 있는 아이콘들을 리스트 모달 화 시킨 컴포넌트입니다.
  - 메뉴 리스트가 on 상태일 때, 배경을 클릭하면 메뉴 리스트가 off 됩니다.
  - 반응형 웹 적용
  - 라우터 연결
*/

import React from "react";
import { ReactComponent as AddIcon } from "../../assets/img/add-icon.svg";
import { ReactComponent as ShopIcon } from "../../assets/img/shop-icon.svg";
import { ReactComponent as MyIcon } from "../../assets/img/my-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/img/logout-icon.svg";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

interface Prop {
  handleMenuOn: () => void;
}

const MenuPop = (from: string, to: string) => keyframes`
  from {
    opacity: ${from};
  }
  to {
    opacity: ${to};
  }
`;

const MenuBox = styled.div`
  position: absolute;
  top: 58px;
  right: 0px;
  width: 150px;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 0px 10px -5px var(--color-light-black);
  z-index: 5;
  animation: ${MenuPop("1", "0")} 0.3s ease-in-out forwards;

  @media screen and (max-width: 736px) {
    animation: ${MenuPop("0", "1")} 0.3s ease-in-out forwards;
  }
`;

const ItemList = styled.ul`
  padding: 0px 10px;
  font-size: var(--fs-pc-small);

  .logout {
    color: var(--color-red);
    border-bottom: none;
  }
`;

const Item = styled.li`
  height: 50px;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  align-items: center;

  svg {
    width: 25px;
    margin: 0px 16px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-black);
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const MenuList = ({ handleMenuOn }: Prop) => {
  return (
    <>
      <MenuBox>
        <ItemList onClick={() => handleMenuOn()}>
          <Item>
            <AddIcon />글 작성하기
          </Item>
          <StyledLink to="/shop">
            <Item>
              <ShopIcon />
              상점 가기
            </Item>
          </StyledLink>
          <StyledLink to="/mypage">
            <Item>
              <MyIcon />
              마이페이지
            </Item>
          </StyledLink>
          <Item className="logout">
            <LogoutIcon />
            Logout
          </Item>
        </ItemList>
      </MenuBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (handleMenuOn) {
            handleMenuOn();
          }
        }}
      />
    </>
  );
};

export default MenuList;
