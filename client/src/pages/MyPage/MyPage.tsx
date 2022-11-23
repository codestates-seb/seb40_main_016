import { useState } from "react";
import styled from "styled-components";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import Avatar from "../../components/Avatar/Avatar";

import MyPageArticles from "./MyPageArticles";
import MyPageComments from "./MyPageComments";
import MyPageSnacks from "./MyPageSnacks";

import { ReactComponent as FollowIcon } from "../../assets/img/follow-icon.svg";
import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as SettingIcon } from "../../assets/img/setting-icon.svg";
import { ReactComponent as WalletIcon } from "../../assets/img/wallet-icon.svg";

import {
  MyAccountPage,
  ProfileContainer,
  ProfileImg,
  ProfileInfo,
  UserInfo,
  UserName,
  UserBtn,
  UserDesc,
} from "./style";

const MyPage = () => {
  const [nowTab, setNowTab] = useState<string>("게시물");

  return (
    <>
      <MyAccountPage>
        <OuterContainer>
          <InnerContainer>
            <ProfileContainer>
              <ProfileImg>
                <Avatar
                  bgUrl="https://user-images.githubusercontent.com/104997140/202975418-e73e747d-ef51-4258-bfce-6e46bcff15bd.png"
                  width="150px"
                  height="150px"
                />
              </ProfileImg>
              <ProfileInfo>
                <UserInfo>
                  <UserName>산호</UserName>
                  <UserBtn>
                    <button>
                      <FollowIcon />
                    </button>
                    <div>
                      <BoneIcon />
                      <span>간식 1000알</span>
                    </div>
                    <button>
                      <SettingIcon />
                    </button>
                    <button>
                      <WalletIcon />
                    </button>
                  </UserBtn>
                </UserInfo>
                <UserDesc>
                  <div>
                    <span>게시물 5</span>
                    <span>팔로우 2</span>
                    <span>팔로워 2</span>
                  </div>
                  <p>겁 많은 소심 강강쥐예요.</p>
                </UserDesc>
              </ProfileInfo>
            </ProfileContainer>
          </InnerContainer>
          <Tab tabName="test" tabList={["게시물", "댓글", "간식"]} barPosition="top" setNowTab={setNowTab}></Tab>
          <div>
            {(() => {
              switch (nowTab) {
                case "게시물":
                  return (
                    <>
                      <MyPageArticles />
                    </>
                  );
                case "댓글":
                  return (
                    <>
                      <MyPageComments />
                    </>
                  );
                case "간식":
                  return (
                    <>
                      <MyPageSnacks />
                    </>
                  );
                default:
                  return <></>;
              }
            })()}
          </div>
        </OuterContainer>
      </MyAccountPage>
    </>
  );
};

export default MyPage;
