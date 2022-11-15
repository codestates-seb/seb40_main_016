/*
담당 : 이수련
생성 : 2022.11.15
수정 : -
소개 : 각종 페이지 및 컴포넌트의 반응형 레이아웃을 잡는 데에 필요한 컴포넌트
설명 : 
  -페이지의 첫번째 아우터 컨테이너엔 자동으로 헤더값만큼 패딩이 들어갑니다.
  -두번째 아우터 컨테이너부턴 헤더 높이가 계산되지 않습니다.
  -이너 컨테이너(L사이즈에서 max-width 1264px 영역)를 벗어나는 
  보더나 셰도우, 배경색을 설정해야 할때 여기에 합니다.
  -InnerContainer 컴포넌트와 함께 사용할 수 있습니다.
  -페이지에서의 용례는 wiki를 참고해주세요.
*/

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  &:nth-of-type(1) {
    padding-top: var(--header-height);
  }
`;

interface Prop {
  children?: React.ReactNode;
  className?: string;
}

const OuterContainer = ({ children, className }: Prop) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default OuterContainer;
