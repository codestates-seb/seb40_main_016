/*
담당 : 이수련
생성 : 2022.11.15
수정 : -
소개 : 각종 페이지 및 컴포넌트의 반응형 레이아웃을 잡는 데에 필요한 컴포넌트
설명 : 
  -L 사이즈에서 최대 1264px까지만 늘어나고 가운데 정렬됩니다.
  -페이지 양 끝 여유 padding을 16px을 담당합니다.
  -다양한 컴포넌트에서 최대 크기를 맞출 때에 사용 가능합니다.
  -OuterContainer 컴포넌트와 함께 사용할 수 있습니다.
  -페이지에서의 용례는 wiki를 참고해주세요.
*/

import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1264px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 16px;
`;

interface Prop {
  children?: React.ReactNode;
  className?: string;
}

const InnerContainer = ({ children, className }: Prop) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default InnerContainer;
