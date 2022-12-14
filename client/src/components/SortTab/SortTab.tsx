/*
담당 : 송인선
생성 : 2022.11.17
수정 : 2022.11.24
소개 : 메인페이지 필터 적용 버튼
설명 : 
  - 메인페이지에서 모든 동물, 강아지, 고양이 계정의 사진을 분류하여 볼 수 있습니다.
  - 기본은 all 버튼으로 적용되어있습니다.
  - 로그인 전역 변수 적용 -> 로그인하면 구독 탭 보임
*/

import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";

import Balloon from "../Balloon/Balloon";

import isLoginState from "../../_state/isLoginState";

import { ReactComponent as AllSymbol } from "../../assets/img/all-symbol.svg";
import { ReactComponent as DogSymbol } from "../../assets/img/dog-symbol.svg";
import { ReactComponent as CatSymbol } from "../../assets/img/cat-symbol.svg";
import { ReactComponent as FollowSymbol } from "../../assets/img/subscribe-icon-ver01.svg";
import { useEffect } from "react";

const Bling = () => keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Purse = () => keyframes`
  10% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  padding: 0px 13px;
  height: 60px;
  background-color: var(--color-ivory);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 8px 0px var(--color-gray);
`;

const SortBtn = styled.button`
  margin: 0px 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  position: relative;

  &.clicked {
    background-color: var(--color-madium-black);
    box-shadow: 0px 0px 5px 0px var(--color-light-black);
    animation: ${Purse} 0.75s cubic-bezier(0.5, 0.5, 0, 1);
  }

  .all-symbol {
    width: 35px;
    position: relative;
  }
  .dog-symbol {
    width: 45px;
    position: relative;
  }
  .cat-symbol {
    width: 40px;
    position: relative;
  }
  .follow-symbol {
    width: 25px;
    position: relative;
  }

  svg {
    &:hover {
      cursor: pointer;
      animation: ${Bling} 0.5s infinite;
    }
  }

  &:hover {
    .all-balloon,
    .dog-balloon,
    .cat-balloon,
    .follow-balloon {
      display: block;
    }
    .dog-balloon,
    .cat-balloon,
    .follow-balloon {
      left: -33px;
    }
  }
`;

interface Props {
  sort: string;
  handleSortClick: (arg: string) => void;
}

const SortTab = ({ handleSortClick, sort }: Props) => {
  const isLogin = useRecoilValue(isLoginState);

  useEffect(() => {
    handleLogoutFollowing();
  }, [isLogin]);

  const handleLogoutFollowing = () => {
    if (sort === "followings" && !isLogin) {
      handleSortClick("all");
    }
  };

  return (
    <>
      <Wrapper>
        <SortBtn className={sort === "all" ? "clicked" : ""} onClick={() => handleSortClick("all")}>
          <AllSymbol className="all-symbol" />
          <Balloon className="all-balloon">모든 계정 보기</Balloon>
        </SortBtn>
        <SortBtn className={sort === "dogs" ? "clicked" : ""} onClick={() => handleSortClick("dogs")}>
          <DogSymbol className="dog-symbol" />
          <Balloon className="dog-balloon">강아지 계정만 보기</Balloon>
        </SortBtn>
        <SortBtn className={sort === "cats" ? "clicked" : ""} onClick={() => handleSortClick("cats")}>
          <CatSymbol className="cat-symbol" />
          <Balloon className="cat-balloon">고양이 계정만 보기</Balloon>
        </SortBtn>
        {isLogin ? (
          <SortBtn className={sort === "followings" ? "clicked" : ""} onClick={() => handleSortClick("followings")}>
            <FollowSymbol className="follow-symbol" />
            <Balloon className="follow-balloon">구독한 계정만 보기</Balloon>
          </SortBtn>
        ) : (
          ""
        )}
      </Wrapper>
      <Balloon />
    </>
  );
};

export default SortTab;
