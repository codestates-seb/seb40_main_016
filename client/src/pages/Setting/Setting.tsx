import { useState } from "react";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import EditProfile from "../../components/Setting/EditProfile/EditProfile";

import { Wrapper, SettingWrapper } from "./style";

const Setting = () => {
  const [nowTab, setNowTab] = useState<string>("프로필 편집");

  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer>
          <SettingWrapper>
            <Tab
              tabName="settingTab"
              tabList={["프로필 편집", "비밀번호 변경", "회원탈퇴"]}
              barPosition="bottom"
              setNowTab={setNowTab}
            />
            {(() => {
              switch (nowTab) {
                case "프로필 편집":
                  return <EditProfile />;
                case "비밀번호 변경":
                  return;
                case "회원탈퇴":
                  return;
                default:
                  return "";
              }
            })()}
          </SettingWrapper>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default Setting;
