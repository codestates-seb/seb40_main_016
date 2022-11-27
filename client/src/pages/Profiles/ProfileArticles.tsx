import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import Avatar from "../../components/Avatar/Avatar";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";

import { GetUserArticles } from "../../api/mypage";

import { ImgContainer, Dim } from "../Main/style";

import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as FishIcon } from "../../assets/img/fish-icon.svg";
import { ReactComponent as FishWIcon } from "../../assets/img/fish-w-icon.svg";
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
  handleArticlesNum: (arg: number) => void;
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
  userType: "PERSON" | "CAT" | "DOG";
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

const ProfileArticles = ({ profileUserId, handleArticlesNum, detailHandler, setArticleId, userType }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [userArticles, setUserArticles] = useState<UserArticles[]>([]);
  const [mostReceivedArticles, setMostReceivedArticles] = useState<UserArticles[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const obsRef = useRef(null);
  const preventRef = useRef(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (page !== 0 && page <= totalPage) getUserArticles();
  }, [page]);

  const handleImgBoxClick = (articleId: number) => {
    setArticleId(articleId);
    detailHandler();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler);
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const obsHandler = (entries: any) => {
    const target = entries[0];

    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const getUserArticles = () => {
    setLoading(true);
    GetUserArticles(profileUserId).then((res: any) => {
      const data = res.data.data;

      const mostReceived = data.slice(0, 5).sort((a: any, b: any) => {
        return b.yummyCnt - a.yummyCnt;
      });

      if (res.data.pageInfo.page === 1) {
        setUserArticles(data);
      } else {
        setUserArticles(userArticles.concat(data));
      }
      preventRef.current = true;
      setMostReceivedArticles(mostReceived);
      handleArticlesNum(data.length);
      setTotalPage(res.data.pageInfo.totalPages);
      setLoading(false);
    });
  };

  return (
    <>
      <MostRecieved>
        <InnerContainer>
          <p>가장 간식을 많이 받은 글 Best 5 👍</p>
          <MostRecievedArticles>
            <CrownIcon className="crown-icon" />
            <ArticleList>
              {mostReceivedArticles.map((article: UserArticles) => (
                <Article
                  key={article.articleId}
                  onClick={() => {
                    handleImgBoxClick(article.articleId);
                  }}
                >
                  <AvatarBox>
                    <Avatar className="avatar" bgUrl={article.articleImg} width="120px" height="120px"></Avatar>
                  </AvatarBox>
                  <div className="avatar-snack">
                    {userType === "CAT" ? <FishIcon /> : <BoneIcon />}
                    <span>{article.yummyCnt}알</span>
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
              <ImgBox
                key={article.articleId}
                onClick={() => {
                  handleImgBoxClick(article.articleId);
                }}
              >
                <Dim />
                <SnackCount>
                  {userType === "CAT" ? <FishWIcon /> : <BoneWIcon />}
                  {article.yummyCnt}알
                </SnackCount>
                <ImageCard className="img-card" imgUrl={article.articleImg} onClick={handleOpen}></ImageCard>
              </ImgBox>
            ))}
            {loading ? (
              Array(8)
                .fill(0)
                .map((_, i) => (
                  <ImgBox key={i}>
                    <ImageSkeleton />
                  </ImgBox>
                ))
            ) : (
              <></>
            )}
            <div ref={obsRef} />
          </ImgContainer>
        </MainContainer>
      </InnerContainer>
    </>
  );
};

export default ProfileArticles;
