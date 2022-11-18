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
    defaultValue="male" 
    />
*/
import React, { useEffect, useRef } from "react";

import { Wrapper, LabelStyle, RadioGroup, RadioBtn, RadioInput } from "./style";

import { ReactComponent as BoyIcon } from "../../assets/img/male-icon.svg";
import { ReactComponent as GirlIcon } from "../../assets/img/female-icon.svg";

interface InputProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | React.Dispatch<React.SetStateAction<string>>;
  height?: string;
  defaultValue?: "male" | "female";
  fontSize?: string;
}

function Gender({ className, onChange, height, defaultValue, fontSize }: InputProps) {
  const boyRef = useRef<HTMLInputElement>(null);
  const girlRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (defaultValue === "male" && boyRef.current) {
      boyRef.current.checked = true;
    } else if (defaultValue === "female" && girlRef.current) {
      girlRef.current.checked = true;
    }
  }, []);

  return (
    <Wrapper className={className}>
      <LabelStyle fontSize={fontSize}>성별</LabelStyle>
      <RadioGroup height={height}>
        <RadioInput
          type="radio"
          id={`${className}-choice-male`}
          name="gender"
          ref={boyRef}
          onChange={onChange}
          data-gender="male"
        />
        <RadioBtn className="male" htmlFor={`${className}-choice-male`}>
          <BoyIcon />
          남아
        </RadioBtn>
        <RadioInput
          type="radio"
          id={`${className}-choice-female`}
          name="gender"
          ref={girlRef}
          onChange={onChange}
          data-gender="female"
        />
        <RadioBtn className="female" htmlFor={`${className}-choice-female`}>
          <GirlIcon />
          여아
        </RadioBtn>
      </RadioGroup>
    </Wrapper>
  );
}

export default Gender;
