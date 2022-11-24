/*
담당 : 김윤희
생성 : 2022.11.23
소개 : 체크박스 컴포넌트
설명 : 
  - 상점 페이지에서 사용되는 체크박스 컴포넌트입니다.
  - 사용 예시: 
  <Checkbox isChecked={isChecked} onClickCheck={onClickCheck} />
*/

import { SCustomCheckboxWrapper, SCustomCheckbox, SCustomLabel } from "./style";

interface CheckboxProps {
  isChecked: boolean;
  onClickCheck: () => void;
}

const Checkbox = ({ isChecked, onClickCheck }: CheckboxProps) => {
  return (
    <SCustomCheckboxWrapper>
      <SCustomCheckbox type="checkbox" isChecked={isChecked} />
      <SCustomLabel onClick={onClickCheck} isChecked={isChecked} />
    </SCustomCheckboxWrapper>
  );
};

export default Checkbox;
