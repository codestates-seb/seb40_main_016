import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import accessTokenState from "../../_state/accessTokenState";
import userInfoState from "../../_state/userInfoState";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import EditProfile from "../../components/Setting/EditProfile/EditProfile";
import ChangePassword from "../../components/Setting/ChangePassword/ChangePassword";
import DeleteAccount from "../../components/Setting/DeleteAccount/DeleteAccount";

import { Wrapper, SettingWrapper } from "./style";

const Setting = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);
  const { userId } = useRecoilValue(userInfoState);

  const [nowTab, setNowTab] = useState<string>("프로필 편집");

  const moveMypage = () => {
    navigate(`/profiles/${userId}`);
  };

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
            <section>
              {(() => {
                switch (nowTab) {
                  case "프로필 편집":
                    return <EditProfile userId={userId} token={token} movePage={moveMypage} />;
                  case "비밀번호 변경":
                    return <ChangePassword userId={userId} token={token} movePage={moveMypage} />;
                  case "회원탈퇴":
                    return <DeleteAccount userId={userId} token={token} movePage={() => navigate("/")} />;
                  default:
                    return "";
                }
              })()}
            </section>
          </SettingWrapper>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default Setting;
