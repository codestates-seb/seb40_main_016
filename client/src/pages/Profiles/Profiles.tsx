import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Tab from "../../components/Tab/Tab";
import Avatar from "../../components/Avatar/Avatar";
import ProfileArticles from "./ProfileArticles";
import ProfileSnacks from "./ProfileSnacks";

import { GetProfile } from "../../api/mypage";
import { GetIsSubscribe, PostSubscribe, DeleteSubscribe } from "../../api/subscribe";

import userInfoState from "../../_state/userInfoState";
import accessTokenState from "../../_state/accessTokenState";

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
  const [nowTab, setNowTab] = useState<string>("게시물");
  const [onFollow, setOnFollow] = useState<boolean>(false);
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
    if (onFollow === true) {
      DeleteSubscribe(myInfo.userId, profileUserId, token)
        .then((res) => {
          return res;
        })
        .catch((err) => alert("구독에 실패했습니다.😿"));
      setOnFollow(false);
    } else if (onFollow === false) {
      PostSubscribe(myInfo.userId, profileUserId, token)
        .then((res) => {
          return res;
        })
        .catch((err) => alert("구독에 실패했습니다.😿"));
      setOnFollow(true);
    }
  };

  const handleArticlesNum = (articles: number) => {
    setUserArticlesNum(articles);
  };

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
                  <FollowBtn className={onFollow ? "follow" : ""} onClick={handleFollow}>
                    {onFollow ? <span>팔로잉</span> : <span>팔로우</span>}
                  </FollowBtn>
                </UserInfo>
                <UserDesc>
                  <div>
                    <span>게시물 {userArticlesNum}</span>
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
        </OuterContainer>
      </MyAccountPage>
    </>
  );
};

export default Profiles;
