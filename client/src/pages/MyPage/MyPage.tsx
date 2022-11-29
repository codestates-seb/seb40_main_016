import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import Avatar from "../../components/Avatar/Avatar";
import MyPageArticles from "./MyPageArticles";
import MyPageComments from "./MyPageComments";
import MyPageSnacks from "./MyPageSnacks";
import FollowPopUp from "../../components/MyPage/FollowPopUp";

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

interface Prop {
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
}
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

const MyPage = ({ detailHandler, setArticleId }: Prop) => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);
  const [nowTab, setNowTab] = useState<string>("게시물");
  const [userArticlesNum, setUserArticlesNum] = useState<number>(0);
  const [openFollowModal, setOpenFollowModal] = useState<boolean>(false);
  const [openFollowerModal, setOpenFollowerModal] = useState<boolean>(false);
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

  const handleArticlesNum = (articles: number) => {
    setUserArticlesNum(articles);
  };

  const handleFollowModal = () => {
    setOpenFollowModal(!openFollowModal);
  };

  const handleFollowerModal = () => {
    setOpenFollowerModal(!openFollowerModal);
  };

  console.log(userInfo);

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
                  <UserName>{userInfo.userName}</UserName>
                  <UserBtn>
                    <YummyBtn>
                      {userInfo.userType === "DOG" ? <BoneIcon /> : <FishIcon />}
                      <span>간식 {userWallet.yummy}알</span>
                    </YummyBtn>
                    <SettingWalletBtn onClick={() => navigate("/setting")}>
                      <SettingIcon />
                    </SettingWalletBtn>
                    <SettingWalletBtn>
                      <WalletIcon />
                    </SettingWalletBtn>
                  </UserBtn>
                </UserInfo>
                <UserDesc>
                  <div>
                    <button>게시물 {userArticlesNum}</button>
                    <button onClick={handleFollowModal}>팔로우 {userInfo.followCnt}</button>
                    <button onClick={handleFollowerModal}>팔로워 {userInfo.followerCnt}</button>
                    {openFollowModal ? <FollowPopUp isOn={openFollowModal} setIsOn={setOpenFollowModal} /> : ""}
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
                          <MyPageArticles
                            handleArticlesNum={handleArticlesNum}
                            detailHandler={detailHandler}
                            setArticleId={setArticleId}
                            userType={userInfo.userType}
                          />
                        </>
                      );
                    case "댓글":
                      return (
                        <>
                          <MyPageComments detailHandler={detailHandler} setArticleId={setArticleId} />
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
                          <MyPageArticles
                            handleArticlesNum={handleArticlesNum}
                            detailHandler={detailHandler}
                            setArticleId={setArticleId}
                            userType={userInfo.userType}
                          />
                        </>
                      );
                    case "댓글":
                      return (
                        <>
                          <MyPageComments detailHandler={detailHandler} setArticleId={setArticleId} />
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
