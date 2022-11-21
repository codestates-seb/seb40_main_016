import { useState } from "react";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";

import { MyAccountPage } from "./style";

const MyPage = () => {
  const [nowTab, setNowTab] = useState<string>("게시물");

  return (
    <>
      <MyAccountPage>
        <OuterContainer>
          <Tab tabName="test" tabList={["게시물", "댓글"]} barPosition="top" setNowTab={setNowTab}></Tab>
          <InnerContainer>
            {(() => {
              switch (nowTab) {
                case "게시물":
                  return (
                    <>
                      <p>게시물 컴포넌트</p>
                    </>
                  );
                case "댓글":
                  return (
                    <>
                      <p>댓글 컴포넌트</p>
                    </>
                  );
                default:
                  return <></>;
              }
            })()}
          </InnerContainer>
        </OuterContainer>
      </MyAccountPage>
    </>
  );
};

export default MyPage;
