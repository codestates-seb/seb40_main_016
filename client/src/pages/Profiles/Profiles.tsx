import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import Avatar from "../../components/Avatar/Avatar";
import ProfileArticles from "./ProfileArticles";
import ProfileSnacks from "./ProfileSnacks";
import FollowPopUp from "../../components/MyPage/FollowPopUp";
import FollowerPopUp from "../../components/MyPage/FollowerPopUp";
import UnFollowPopUp from "../../components/MyPage/UnFollowPopUp";
import TopButton from "../../components/TopButton/TopButton";

import { GetProfile } from "../../api/mypage";
import { GetIsSubscribe, PostSubscribe, DeleteSubscribe } from "../../api/subscribe";

import userInfoState from "../../_state/userInfoState";
import accessTokenState from "../../_state/accessTokenState";
import isLoginState from "../../_state/isLoginState";

import {
  MyAccountPage,
  ProfileContainer,
  ProfileImg,
  ProfileInfo,
  UserInfo,
  UserName,
  FollowBtn,
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

const Profiles = ({ detailHandler, setArticleId }: Prop) => {
  const [userArticlesNum, setUserArticlesNum] = useState<number>(0);
  const profileUserId = parseInt(useParams().id);
  const myInfo = useRecoilValue(userInfoState);
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);
  const [nowTab, setNowTab] = useState<string>("게시물");
  const [onFollow, setOnFollow] = useState<boolean>(false);
  const [openFollowModal, setOpenFollowModal] = useState<boolean>(false);
  const [openFollowerModal, setOpenFollowerModal] = useState<boolean>(false);
  const [openUnFollowModal, setOpenUnFollowModal] = useState<boolean>(false);
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

  useEffect(() => {
    GetProfile(profileUserId).then((res: any) => {
      setUserInfo(res.data.data);
    });
  }, []);

  useEffect(() => {
    GetIsSubscribe(myInfo.userId, profileUserId).then((res: any) => {
      if (res.data === "ok") {
        setOnFollow(true);
      } else {
        setOnFollow(false);
      }
    });
  }, []);

  const handleFollow = () => {
    if (onFollow && isLogin) {
      handleUnFollowModal();
    } else if (!onFollow && isLogin) {
      PostSubscribe(myInfo.userId, profileUserId, token)
        .then((res) => {
          return res;
        })
        .catch((err) => alert("구독에 실패했습니다.😿"));
      setOnFollow(true);
      window.location.reload();
    } else if (!isLogin) {
      alert("로그인이 필요합니다.😆");
    }
  };

  const handleArticlesNum = (articles: number) => {
    setUserArticlesNum(articles);
  };

  const handleFollowModal = () => {
    setOpenFollowModal(!openFollowModal);
  };

  const handleFollowerModal = () => {
    setOpenFollowerModal(!openFollowerModal);
  };

  const handleUnFollowModal = () => {
    setOpenUnFollowModal(!openUnFollowModal);
  };

  return (
    <>
      <MyAccountPage>
        <OuterContainer style={{ minHeight: "calc(100vh - 150px)" }}>
          <InnerContainer>
            <ProfileContainer>
              <ProfileImg>
                <Avatar className="profile-avatar" bgUrl={userInfo.userImg} width="150px" height="150px" />
              </ProfileImg>
              <ProfileInfo>
                <UserInfo>
                  <UserName>{userInfo.userName}</UserName>
                  <FollowBtn className={onFollow ? "follow" : ""} onClick={handleFollow}>
                    {onFollow ? <span>팔로잉</span> : <span>팔로우</span>}
                  </FollowBtn>
                </UserInfo>

                <UserDesc>
                  <div>
                    <button>게시물 {userArticlesNum}</button>
                    <button onClick={handleFollowModal}>팔로우 {userInfo.followCnt}</button>
                    <button onClick={handleFollowerModal}>팔로워 {userInfo.followerCnt}</button>
                  </div>
                  <p>{userInfo.content}</p>
                </UserDesc>
                {openFollowModal ? <FollowPopUp setIsOn={setOpenFollowModal} userId={userInfo.userId} /> : ""}
                {openFollowerModal ? <FollowerPopUp setIsOn={setOpenFollowerModal} userId={userInfo.userId} /> : ""}
                {openUnFollowModal ? (
                  <UnFollowPopUp
                    setIsOn={setOpenUnFollowModal}
                    userName={userInfo.userName}
                    userImg={userInfo.userImg}
                    userId={profileUserId}
                    setOnFollow={setOnFollow}
                  />
                ) : (
                  ""
                )}
              </ProfileInfo>
            </ProfileContainer>
          </InnerContainer>
          {userInfo.userType !== "PERSON" ? (
            <>
              <Tab tabName="test" tabList={["게시물", "간식"]} barPosition="top" setNowTab={setNowTab}></Tab>
              <div>
                {(() => {
                  switch (nowTab) {
                    case "게시물":
                      return (
                        <>
                          <ProfileArticles
                            profileUserId={profileUserId}
                            handleArticlesNum={handleArticlesNum}
                            detailHandler={detailHandler}
                            setArticleId={setArticleId}
                            userType={userInfo.userType}
                          />
                        </>
                      );
                    case "간식":
                      return (
                        <>
                          <ProfileSnacks profileUserId={profileUserId} />
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
              <Tab tabName="test" tabList={["게시물"]} barPosition="top" setNowTab={setNowTab}></Tab>
              <div>
                {(() => {
                  switch (nowTab) {
                    case "게시물":
                      return (
                        <>
                          <ProfileArticles
                            profileUserId={profileUserId}
                            handleArticlesNum={handleArticlesNum}
                            detailHandler={detailHandler}
                            setArticleId={setArticleId}
                            userType={userInfo.userType}
                          />
                        </>
                      );
                    default:
                      return <></>;
                  }
                })()}
              </div>
            </>
          )}
          <TopButton />
        </OuterContainer>
      </MyAccountPage>
    </>
  );
};

export default Profiles;
