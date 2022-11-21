/*
담당 : 김윤희
생성 : 2022.11.15
수정 : 
  -2022.11.17 (이수련) disabled 옵션 추가
소개 : 버튼 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 버튼 컴포넌트입니다.
  - 사용 예시: 
  <Button 
    className="loginBtn"
    onClick={onClick}
    width="150px"
    height="30px"
    btnColor="yellow"
    btnHoverColor="light-black"
    textColor="black"
    fontSize="pc-regular"
    isShadow={true}
  >
    내용
  </Button>
*/

import { ReactNode } from "react";
import { ButtonStyle } from "./style";

export interface ButtonProps {
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
  disabled?: boolean;
}

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
  disabled,
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
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
}

export default Button;
