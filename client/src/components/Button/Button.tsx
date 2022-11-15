/*
담당 : 김윤희
생성 : 2022.11.15
수정 : -
소개 : 버튼 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 버튼 컴포넌트입니다.
  - 사용 예시: 
  <Button 
    className="loginBtn"
    onClick={onClick},
    width="150px",
    height="30px",
    buttonColor="yellow",
    btnHoverColor="light-black",
    textColor="black",
    fontSize="pc-regular",
    isShadow={true}
  >
    내용
  </Button>
*/

import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  width?: string;
  height?: string;
  btnColor?: string;
  btnHoverColor?: string;
  textColor?: string;
  fontSize?: string;
  isShadow?: boolean;
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  border-style: none;
  border-radius: 15px;
  ${({
    width = "150px",
    height = "40px",
    btnColor = "ivory",
    btnHoverColor = "dark-ivory",
    textColor = "black",
    fontSize = "pc-regular",
    isShadow = false,
  }) => css`
    width: ${width};
    height: ${height};
    background-color: ${`var(--color-${btnColor})`};
    color: ${`var(--color-${textColor})`};
    font-size: ${`var(--fs-${fontSize})`};
    box-shadow: ${isShadow ? "0px 3px 3px var(--color-gray)" : "none"};

    &:hover {
      background-color: ${`var(--color-${btnHoverColor})`};
    }

    &:active {
      margin-left: 1px;
      margin-top: 1px;
      box-shadow: none;
    }
  `}
`;

function Button({
  className,
  children,
  onClick,
  width,
  height,
  btnColor,
  btnHoverColor,
  textColor,
  fontSize,
  isShadow,
}: ButtonProps) {
  return (
    <ButtonStyle
      className={className}
      width={width}
      height={height}
      btnColor={btnColor}
      btnHoverColor={btnHoverColor}
      textColor={textColor}
      fontSize={fontSize}
      isShadow={isShadow}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
}

export default Button;
