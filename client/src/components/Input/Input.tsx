/*
담당 : 김윤희
생성 : 2022.11.15
수정 : -
소개 : 인풋 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 인풋 컴포넌트입니다.
  - 사용 예시: 
  <Input 
    className="idInput"
    type="text"
    value="testId"
    placeholder="아이디를 입력하세요"
    onChange={onChange}
    height="30px"
    inputColor="ivory"
    fontSize="pc-regular"
    label="아이디"
    isError={true}
    errorMsg="아이디에는 특수문자를 사용할 수 없습니다."
  />
*/

import { Wrapper, LabelStyle, InputStyle, ErrorMsgStyle } from "./style";

interface InputProps {
  className?: string;
  type?: "text" | "password" | "date";
  value?: string;
  placeholder: string;
  onChange: () => void;
  height?: string;
  inputColor?: string;
  label: string;
  fontSize?: string;
  isError?: boolean;
  errorMsg?: string;
}

function Input({
  className,
  type = "text",
  value,
  placeholder,
  onChange,
  height,
  inputColor,
  label,
  fontSize,
  isError = false,
  errorMsg,
}: InputProps) {
  return (
    <Wrapper>
      <LabelStyle fontSize={fontSize}>{label}</LabelStyle>
      <InputStyle
        className={className}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        height={height}
        inputColor={inputColor}
        onChange={onChange}
      />
      {isError && <ErrorMsgStyle>{errorMsg}</ErrorMsgStyle>}
    </Wrapper>
  );
}

export default Input;
