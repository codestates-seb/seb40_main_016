/*
담당 : 김윤희
생성 : 2022.11.23
수정 : 2022.11.25
소개 : 체크박스 컴포넌트
설명 : 
  - 상점 페이지에서 사용되는 체크박스 컴포넌트입니다.
  - 수정 : 필요없는 코드 제거
  - 사용 예시: 
  <Checkbox isChecked={isChecked} onClickCheck={onClickCheck} />
*/

import { CheckboxWrapper, Label } from "./style";

interface CheckboxProps {
  isChecked: boolean;
  onClickCheck: () => void;
}

const Checkbox = ({ isChecked, onClickCheck }: CheckboxProps) => {
  return (
    <CheckboxWrapper>
      <input type="checkbox" hidden />
      <Label onClick={onClickCheck} isChecked={isChecked} />
    </CheckboxWrapper>
  );
};

export default Checkbox;
