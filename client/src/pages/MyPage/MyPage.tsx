import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import Avatar from "../../components/Avatar/Avatar";
import MyPageArticles from "./MyPageArticles";
import MyPageComments from "./MyPageComments";
import MyPageSnacks from "./MyPageSnacks";

import { GetMyProfile } from "../../api/mypage";

import userInfoState from "../../_state/userInfoState";
import accessTokenState from "../../_state/accessTokenState";

import { ReactComponent as FishIcon } from "../../assets/img/fish-icon.svg";
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
  YummyBtn,
  SettingWalletBtn,
  UserDesc,
} from "./style";

interface UserInfoProps {
  content: string;
  email: string;
  followCnt: number;
  followerCnt: number;
  userBirth: string;
  userId: number;
  userImg: string;
  userName: string;
  userType: "PERSON" | "CAT" | "DOG";
}
interface UserWalletProps {
  walletId: number;
  yummy: number;
}

const MyPage = () => {
  const token = useRecoilValue(accessTokenState);
  const myInfo = useRecoilValue(userInfoState);
  const [nowTab, setNowTab] = useState<string>("게시물");
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    content: "",
    email: "",
    followCnt: 0,
    followerCnt: 0,
    userBirth: "",
    userId: 0,
    userImg: "",
    userName: "",
    userType: "CAT",
  });
  const [userWallet, setUserWallet] = useState<UserWalletProps>({
    walletId: 0,
    yummy: 0,
  });

  useEffect(() => {
    GetMyProfile(token).then((res: any) => {
      setUserInfo(res.data);
      setUserWallet(res.data.wallet);
    });
  }, []);

  return (
    <>
      <MyAccountPage>
        <OuterContainer>
          <InnerContainer>
            <ProfileContainer>
              <ProfileImg>
                <Avatar className="profile-avatar" bgUrl={userInfo.userImg} width="150px" height="150px" />
              </ProfileImg>
              <ProfileInfo>
                <UserInfo>
                  <div>
                    <UserName>{userInfo.userName}</UserName>
                  </div>
                  <div>
                    <UserBtn>
                      <YummyBtn>
                        {userInfo.userType === "DOG" ? <BoneIcon /> : <FishIcon />}
                        <span>간식 {userWallet.yummy}알</span>
                      </YummyBtn>
                      <SettingWalletBtn>
                        <SettingIcon />
                      </SettingWalletBtn>
                      <SettingWalletBtn>
                        <WalletIcon />
                      </SettingWalletBtn>
                    </UserBtn>
                  </div>
                </UserInfo>
                <UserDesc>
                  <div>
                    <span>게시물 5</span>
                    <span>팔로우 {userInfo.followCnt}</span>
                    <span>팔로워 {userInfo.followerCnt}</span>
                  </div>
                  <p>{userInfo.content}</p>
                </UserDesc>
              </ProfileInfo>
            </ProfileContainer>
          </InnerContainer>
          {userInfo.userType !== "PERSON" ? (
            <>
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
            </>
          ) : (
            <>
              <Tab tabName="test" tabList={["게시물", "댓글"]} barPosition="top" setNowTab={setNowTab}></Tab>
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
                    default:
                      return <></>;
                  }
                })()}
              </div>
            </>
          )}
        </OuterContainer>
      </MyAccountPage>
    </>
  );
};

export default MyPage;
