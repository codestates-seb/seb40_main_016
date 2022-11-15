/*
담당 : 이수련
생성 : 2022.11.15
수정 : -
소개 : 모달 창 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 모달 창 컴포넌트입니다.
  - 사용예시:
    //배경 블러처리 있을 때 (title optional)
    <Modal title="제목" bg={true} isOn={isPopup} setIsOn={setIsPopup}>
      <p>내용</p>
    </Modal>

    //배경 블러처리 없을 때 (title required)
    <Modal title="제목" bg={false} isOn={isPopup} setIsOn={setIsPopup}>
      <p>내용</p>
    </Modal>

  - 옵션: 옵션에 대한 설명은 wiki를 참고해주세요
  - 주의 사항: bg가 false 일땐, 반드시 title이 존재해야합니다.
*/

import React from "react";
import { Bg, Popup, PopupHeader } from "./style";
import { ReactComponent as CloseBtn } from "../../assets/img/close-icon.svg";

interface Prop {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  bg?: boolean;
  title?: string;
  isOn: boolean;
  setIsOn: (arg: boolean) => void;
}

const Modal = ({ children, className, maxWidth = "640px", bg = false, title = "", isOn = false, setIsOn }: Prop) => {
  const HandleOnOff = () => {
    setIsOn(!isOn);
  };

  return (
    <Bg bg={bg} isOn={isOn}>
      {bg ? <CloseBtn onClick={HandleOnOff} /> : ""}
      <Popup className={className} maxWidth={maxWidth}>
        {title ? (
          <PopupHeader title={title}>
            {title}
            {!bg ? <CloseBtn onClick={HandleOnOff} /> : ""}
          </PopupHeader>
        ) : (
          ""
        )}

        {children}
      </Popup>
    </Bg>
  );
};

export default Modal;
