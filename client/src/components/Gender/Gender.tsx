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
    defaultValue="MALE" 
    />
*/
import { useEffect, useRef } from "react";

import { Wrapper, LabelStyle, RadioGroup, RadioBtn, RadioInput } from "./style";

import { ReactComponent as MaleIcon } from "../../assets/img/male-icon.svg";
import { ReactComponent as FemaleIcon } from "../../assets/img/female-icon.svg";

interface InputProps {
  className?: string;
  onClickMale: () => void;
  onClickFemale: () => void;
  height?: string;
  defaultValue?: "MALE" | "FEMALE";
  fontSize?: string;
}

function Gender({ className, onClickMale, onClickFemale, height, defaultValue, fontSize }: InputProps) {
  const boyRef = useRef<HTMLInputElement>(null);
  const girlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue === "MALE" && boyRef.current) {
      boyRef.current.checked = true;
    } else if (defaultValue === "FEMALE" && girlRef.current) {
      girlRef.current.checked = true;
    }
  }, []);

  return (
    <Wrapper className={className}>
      <LabelStyle fontSize={fontSize}>성별</LabelStyle>
      <RadioGroup height={height}>
        <RadioInput type="radio" id={`${className}-choice-male`} name="gender" ref={boyRef} onChange={onClickMale} />
        <RadioBtn className="male" htmlFor={`${className}-choice-male`}>
          <MaleIcon />
          남아
        </RadioBtn>
        <RadioInput
          type="radio"
          id={`${className}-choice-female`}
          name="gender"
          ref={girlRef}
          onChange={onClickFemale}
        />
        <RadioBtn className="female" htmlFor={`${className}-choice-female`}>
          <FemaleIcon />
          여아
        </RadioBtn>
      </RadioGroup>
    </Wrapper>
  );
}

export default Gender;
