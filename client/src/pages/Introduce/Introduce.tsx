import { useState } from "react";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ProjectIntro from "../../components/Introduce/ProjectIntro/ProjectIntro";
import RollingPaper from "../../components/Introduce/RollingPaper/RollingPaper";
import Tab from "../../components/Tab/Tab";

import { Wrapper } from "./style";

const Introduce = () => {
  const [nowTab, setNowTab] = useState<string>("프로젝트 소개");

  return (
    <>
      <Wrapper>
        <OuterContainer>
          <Tab
            tabName="introduce"
            tabList={["프로젝트 소개", "롤링페이퍼"]}
            barPosition="bottom"
            setNowTab={setNowTab}
          />
          <InnerContainer>
            <div>
              {(() => {
                switch (nowTab) {
                  case "프로젝트 소개":
                    return (
                      <>
                        <ProjectIntro />
                      </>
                    );
                  case "롤링페이퍼":
                    return (
                      <>
                        <RollingPaper />
                      </>
                    );
                  default:
                    return <></>;
                }
              })()}
            </div>
          </InnerContainer>
        </OuterContainer>
      </Wrapper>
    </>
  );
};

export default Introduce;
