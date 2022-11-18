/*
담당 : 이수련
생성 : 2022.11.17
수정 : -
소개 : 성별 선택 컴포넌트
설명 : 
  - 사용 예시: 
  <Gender 
    height="50px" 
    fontSize="pc-regular" 
    onChange={onChangeGender} 
    defaultValue="boy" 
    />
*/
import React, { useEffect, useRef } from "react";

import { Wrapper, LabelStyle, RadioGroup, RadioBtn, RadioInput } from "./style";

import { ReactComponent as BoyIcon } from "../../assets/img/boy-icon.svg";
import { ReactComponent as GirlIcon } from "../../assets/img/girl-icon.svg";

interface InputProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | React.Dispatch<React.SetStateAction<string>>;
  height?: string;
  defaultValue?: "boy" | "girl";
  fontSize?: string;
}

function Gender({ className, onChange, height, defaultValue, fontSize }: InputProps) {
  const boyRef = useRef<HTMLInputElement>(null);
  const girlRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (defaultValue === "boy" && boyRef.current) {
      boyRef.current.checked = true;
    } else if (defaultValue === "girl" && girlRef.current) {
      girlRef.current.checked = true;
    }
  }, []);

  return (
    <Wrapper className={className}>
      <LabelStyle fontSize={fontSize}>성별</LabelStyle>
      <RadioGroup height={height}>
        <RadioInput
          type="radio"
          id={`${className}-choice-boy`}
          name="gender"
          ref={boyRef}
          onChange={onChange}
          data-gender="boy"
        />
        <RadioBtn className="boy" htmlFor={`${className}-choice-boy`}>
          <BoyIcon />
          남아
        </RadioBtn>
        <RadioInput
          type="radio"
          id={`${className}-choice-girl`}
          name="gender"
          ref={girlRef}
          onChange={onChange}
          data-gender="girl"
        />
        <RadioBtn className="girl" htmlFor={`${className}-choice-girl`}>
          <GirlIcon />
          여아
        </RadioBtn>
      </RadioGroup>
    </Wrapper>
  );
}

export default Gender;
