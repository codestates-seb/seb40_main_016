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

import styled, { css } from "styled-components";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelStyle = styled.label<{ fontSize?: string }>`
  color: var(--color-black);
  margin: 5px 10px;

  ${({ fontSize = "pc-regular" }) => css`
    font-size: ${`var(--fs-${fontSize})`};
  `};
`;

const ErrorMsgStyle = styled.p`
  color: var(--color-red);
  margin: 5px 10px;
  font-size: var(--fs-pc-small);
`;

const InputStyle = styled.input<{ height?: string; inputColor?: string; fontSize?: string }>`
  width: 100%;
  padding: 0 15px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid var(--color-dark-gray);

  ${({ height = "50px", inputColor = "white", fontSize = "pc-regular" }) => css`
    height: ${height};
    background-color: ${`var(--color-${inputColor})`};
    font-size: ${`var(--fs-${fontSize})`};

    &:focus {
      outline: none;
      border: 1px solid var(--color-sky);
    }
  `}
`;

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
