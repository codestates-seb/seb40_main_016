/*
담당 : 이수련
생성 : 2022.11.15
수정 : 
  - 2022.11.16
  - 2022.11.19 (김윤희) 글 작성시 뒤로가기 기능 추가, 사진 선택&글 작성 컴포넌트 구분하는 함수 추가
  - 2022.11.28 (김윤희) next, done 버튼 한글로 변경
소개 : 모달 창 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 모달 창 컴포넌트입니다.
  - 사용예시:
    <Modal
        title="제목" //제목영역에 띄울 글자
        maxWidth="700px" //L사이즈에서 최대 너비
        bg={true} //배경 까만색 될건지
        isOn={isPopup} //팝업 끄고 키는 state
        setIsOn={setIsPopup} //팝업 끄고 키는 set함수
        onTitleBtnClick={onClick} //타이틀 영역 버튼 누르면 실행되는 함수
        titleBtn="close" //타이틀 영역 어떤 버튼이 필요한지
      >
  - 
*/

import React from "react";
import { Bg, Popup, PopupHeader, PrevNextBtn } from "./style";
import { ReactComponent as CloseBtn } from "../../assets/img/close-icon.svg";
import { ReactComponent as DoneBtn } from "../../assets/img/check-icon.svg";
import { ReactComponent as MoreBtn } from "../../assets/img/more-icon.svg";

interface Prop {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  bg?: boolean;
  title?: string;
  isOn: boolean;
  setIsOn: (arg: boolean) => void;
  titleBtn?: "close" | "next" | "done" | "more" | "none";
  onTitleBtnClick?: () => void;
  onTitlePrevBtnClick?: () => void;
  onCloseBefore?: () => void;
}

const Modal = ({
  children,
  className,
  maxWidth = "640px",
  bg = false,
  title = "",
  isOn = false,
  setIsOn,
  titleBtn = "none",
  onTitleBtnClick,
  onTitlePrevBtnClick,
  onCloseBefore,
}: Prop) => {
  const HandleOnOff = () => {
    setIsOn(!isOn);
  };

  return (
    <Bg bg={bg} isOn={isOn}>
      {bg && (
        <CloseBtn
          onClick={() => {
            HandleOnOff();
            if (onCloseBefore) onCloseBefore();
          }}
        />
      )}
      <Popup className={className} maxWidth={maxWidth}>
        {title && (
          <PopupHeader title={title}>
            {titleBtn === "done" && (
              <PrevNextBtn className="prev" onClick={onTitlePrevBtnClick}>
                이전
              </PrevNextBtn>
            )}
            {title}
            {
              {
                close: <CloseBtn onClick={HandleOnOff} />,
                next: (
                  <PrevNextBtn className="next" onClick={onTitleBtnClick}>
                    다음
                  </PrevNextBtn>
                ),
                done: (
                  <PrevNextBtn className="done" onClick={onTitleBtnClick}>
                    완료
                  </PrevNextBtn>
                ),
                more: <MoreBtn onClick={onTitleBtnClick} />,
                none: "",
              }[titleBtn]
            }
          </PopupHeader>
        )}
        {children}
      </Popup>
    </Bg>
  );
};

export default Modal;
