/*
담당 : 이수련
생성 : 2022.11.20
수정 : -
소개 : 탭 컴포넌트
설명 : 
  - 페이지에서 공통적으로 사용되는 컨텐츠 전환을 위한 탭 컴포넌트입니다.
  - 사용예시:
    <Tab 
        tabName="test" //탭 고유 name
        tabList={["게시물", "댓글"]} //tab 종류 배열
        barPosition="top"  //active 표시 bar와 border라인 위치
        setNowTab={setNowTab}> //현재 tab  state를 바꿀 set 함수(컨텐츠와 연동 위함)
    </Tab>
  - 
*/

import React, { FormEventHandler, useEffect, useRef } from "react";

import { Wrapper, Radio, TabBtn } from "./style";

interface Prop {
  className?: string;
  tabName: string;
  tabList: string[];
  barPosition?: "top" | "bottom";
  setNowTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tab = ({ className = "", tabName, tabList, barPosition = "top", setNowTab }: Prop) => {
  const tabRefs: any = useRef([]);

  useEffect(() => {
    tabRefs.current[0].defaultChecked = true;
  }, [tabRefs]);

  const onChange: FormEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setNowTab(target.id);
  };

  return (
    <>
      <form onChange={onChange}>
        <Wrapper className={className} barPosition={barPosition}>
          {tabList.map((tab, idx) => {
            return (
              <div key={idx}>
                <Radio
                  ref={(ref) => (tabRefs.current[idx] = ref)}
                  type="radio"
                  id={`${tab}`}
                  name={tabName}
                  barPosition={barPosition}
                ></Radio>
                <TabBtn htmlFor={`${tab}`}>{tab}</TabBtn>
              </div>
            );
          })}
        </Wrapper>
      </form>
    </>
  );
};

export default Tab;
