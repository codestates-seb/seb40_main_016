import { useEffect, useState } from "react";
import styled from "styled-components";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import Avatar from "../../components/Avatar/Avatar";

import { GetUserArticles } from "../../api/mypage";

import { ImgContainer, Dim, InfoBox, Info } from "../Main/style";

import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as CrownIcon } from "../../assets/img/crown-icon.svg";

const MostRecieved = styled.div`
  padding: 10px 0px;
  margin: 30px 0px;
  background-color: #f6f6f6;
  overflow: scroll;

  p {
    margin-left: 10px;
    font-size: var(--fs-pc-small);
  }
`;

const MostRecievedArticles = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .avatar {
    margin: 0px 10px;
  }

  .crown-icon {
    margin: 5px 55px 10px;
    width: 23px;
  }
`;

const ArticleList = styled.div`
  display: flex;
`;

const Article = styled.div`
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 5px;
      width: 15px;
    }
  }

  span {
    font-size: var(--fs-pc-small);
  }

  .avatar-snack {
    margin-top: 8px;
  }
`;

const AvatarBox = styled.div`
  width: 125px;
  height: 125px;
  border: 2px solid var(--color-gray);
  position: relative;
  border-radius: 50%;
  box-shadow: 0px 3px 10px 0px var(--color-gray);
  cursor: pointer;

  .avatar {
    margin: 0px;
  }
`;

const MainContainer = styled.div`
  padding: 50px 0px;
  display: flex;
  flex-direction: column;

  .img-box {
    position: relative;
  }
`;

const ImgBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px var(--color-light-black);

  .img-card {
    max-height: 278px;
  }

  @media screen and (max-width: 736px) {
    border-radius: 0px;
  }
`;

const SnackCount = styled.div`
  padding: 0px 15px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  font-size: var(--fs-pc-small);
  color: var(--color-white);
  background-color: #0c0d0e70;
  border-radius: 20px;

  svg {
    margin-right: 5px;
    width: 15px;
    color: var(--color-white);
  }

  @media screen and (max-width: 736px) {
    bottom: 5px;
    left: 5px;
  }
`;

interface Props {
  profileUserId: number;
}

interface UserArticles {
  articleId: number;
  articleImg: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
  views: number;
  yummyCnt: number;
}

const ProfileArticles = (profileUserId: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [userArticles, setUserArticles] = useState<UserArticles[]>([]);
  const [mostReceivedArticles, setMostReceivedArticles] = useState<UserArticles[]>([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetUserArticles(profileUserId.profileUserId).then((res) => {
      const data = res.data.data;

      const mostReceived = data.slice(0, 5).sort((a: any, b: any) => {
        return b.yummyCnt - a.yummyCnt;
      });

      setUserArticles(data);
      setMostReceivedArticles(mostReceived);
    });
  }, []);

  return (
    <>
      <MostRecieved>
        <InnerContainer>
          <p>가장 간식을 많이 받은 글 Best 5 👍</p>
          <MostRecievedArticles>
            <CrownIcon className="crown-icon" />
            <ArticleList>
              {mostReceivedArticles.map((article: UserArticles) => (
                <Article key={article.articleId}>
                  <AvatarBox>
                    <Avatar className="avatar" bgUrl={article.articleImg} width="120px" height="120px"></Avatar>
                  </AvatarBox>
                  <div className="avatar-snack">
                    <BoneIcon /> <span>{article.yummyCnt}알</span>
                  </div>
                </Article>
              ))}
            </ArticleList>
          </MostRecievedArticles>
        </InnerContainer>
      </MostRecieved>
      <InnerContainer>
        <MainContainer>
          <ImgContainer>
            {userArticles.map((article: UserArticles) => (
              <ImgBox key={article.articleId}>
                <Dim>
                  <InfoBox>
                    <Info>
                      <BoneWIcon />
                      {article.yummyCnt}
                    </Info>
                  </InfoBox>
                </Dim>
                <SnackCount>
                  <BoneWIcon /> {article.yummyCnt}알
                </SnackCount>
                <ImageCard className="img-card" imgUrl={article.articleImg} onClick={handleOpen}></ImageCard>
              </ImgBox>
            ))}
          </ImgContainer>
        </MainContainer>
      </InnerContainer>
    </>
  );
};

export default ProfileArticles;
