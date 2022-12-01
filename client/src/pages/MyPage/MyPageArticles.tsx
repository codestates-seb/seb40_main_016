import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import "react-loading-skeleton/dist/skeleton.css";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";
import NoContent from "../../components/NoContent/NoContent";

import { ImgContainer, Dim } from "../Main/style";

import accessTokenState from "../../_state/accessTokenState";

import { GetMyArticles } from "../../api/mypage";

import { ArticleImg } from "../../types/article";

import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as FishIcon } from "../../assets/img/fish-icon.svg";
import { ReactComponent as FishWIcon } from "../../assets/img/fish-w-icon.svg";
import { ReactComponent as CrownIcon } from "../../assets/img/crown-icon.svg";

const MostRecieved = styled.div`
  padding: 10px 0px;
  margin: 30px 0px 50px;
  background-color: #f6f6f6;

  p {
    margin-left: 10px;
    font-size: var(--fs-pc-small);
  }

  @media screen and (max-width: 736px) {
    margin: 20px 0px 20px;
  }
`;

const MostRecievedArticles = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  .avatar {
    margin: 0px 10px;
  }

  .crown-icon {
    margin: 5px 55px 10px;
    width: 23px;
  }

  @media screen and (max-width: 736px) {
    .crown-icon {
      margin: 5px 43px 10px;
      width: 18px;
    }
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

  @media screen and (max-width: 736px) {
    div {
      svg {
        width: 13px;
      }
    }
    span {
      font-size: 13px;
    }
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

  @media screen and (max-width: 736px) {
    width: 95px;
    height: 95px;

    .avatar {
      width: 90px;
      height: 90px;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  .img-box {
    position: relative;
  }
`;

const FilterBtnBox = styled.div`
  margin: 0px 0px 50px;
  width: 210px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
    margin: 0px 0px 30px;
    width: 170px;
  }

  button {
    box-shadow: 0px 2px 5px 0px var(--color-gray);

    &.clicked {
      background-color: var(--color-madium-black);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-madium-black);
      }
    }
    @media screen and (max-width: 736px) {
      width: 80px;
      height: 40px;
      font-size: var(--fs-pc-xsmall);
    }
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
    padding: 0px 12px;
    bottom: 5px;
    left: 5px;
    height: 30px;
    font-size: var(--fs-pc-xsmall);

    svg {
      width: 12px;
    }
  }
`;

const NoArticleContainer = styled.div`
  padding: 0px 0px 30px;
  min-height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  span {
    margin-top: 20px;
    font-weight: 700;
    font-size: var(--fs-pc-regular);
    color: var(--color-light-black);
  }

  img {
    width: 150px;
  }
`;

interface Props {
  handleArticlesNum: (arg: number) => void;
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
  userType: "PERSON" | "CAT" | "DOG";
}
interface MyArticles {
  articleId: number;
  articleImg: ArticleImg;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
  giveYummyCnt: number;
  views: number;
  yummyCnt: number;
}

const MyPageArticles = ({ handleArticlesNum, detailHandler, setArticleId, userType }: Props) => {
  const token = useRecoilValue(accessTokenState);
  const [myArticles, setMyArticles] = useState<MyArticles[]>(null);
  const [mostReceivedArticles, setMostReceivedArticles] = useState<MyArticles[]>([]);
  const [tab, setTab] = useState<string>("post");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const obsRef = useRef(null);

  const handleImgBoxClick = (articleId: number) => {
    setArticleId(articleId);
    detailHandler();
  };

  const handleTabClick = async (tabArg: "post" | "give") => {
    setTab(tabArg);
    getMyArticles(1, tabArg, token);
  };

  const getMyArticles = (page: number, tab: string, token: string) => {
    setLoading(true);

    GetMyArticles(page, tab, token).then((res) => {
      if (res.data.pageInfo.page === 1) {
        setMyArticles(res.data.data);
        setPage(2);
      } else {
        setMyArticles(myArticles.concat(res.data.data));
        setPage((prev) => prev + 1);
      }
      handleArticlesNum(res.data.data.length);
      setTotalPage(res.data.pageInfo.totalPages);
      setLoading(false);
    });
  };

  const GetMostReceived = (page: number, token: string) => {
    GetMyArticles(page, "post", token).then((res: any) => {
      const data = res.data.data;

      const mostReceived = data.slice(0, 5).sort((a: any, b: any) => {
        return b.yummyCnt - a.yummyCnt;
      });
      setMostReceivedArticles(mostReceived);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page <= totalPage) {
        getMyArticles(page, tab, token);
        GetMostReceived(page, token);
      }
    });

    if (obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, totalPage, tab, token]);

  return (
    <>
      {userType === "PERSON" ? (
        ""
      ) : (
        <>
          <MostRecieved>
            <InnerContainer>
              <p>가장 간식을 많이 받은 글 Best 5 👍</p>
              {myArticles && myArticles.length === 0 ? (
                <NoArticleContainer>
                  <span>아직 간식을 받은 글이 없습니다.</span>
                </NoArticleContainer>
              ) : (
                <MostRecievedArticles>
                  <CrownIcon className="crown-icon" />
                  <ArticleList>
                    {mostReceivedArticles.map((article: MyArticles) => (
                      <Article
                        key={article.articleId}
                        onClick={() => {
                          handleImgBoxClick(article.articleId);
                        }}
                      >
                        <AvatarBox>
                          <Avatar
                            className="avatar"
                            bgUrl={article.articleImg.images[0].imgUrl}
                            width="120px"
                            height="120px"
                          ></Avatar>
                        </AvatarBox>
                        <div className="avatar-snack">
                          {userType === "DOG" ? <BoneIcon /> : <FishIcon />}
                          <span>{article.yummyCnt}알</span>
                        </div>
                      </Article>
                    ))}
                  </ArticleList>
                </MostRecievedArticles>
              )}
            </InnerContainer>
          </MostRecieved>
        </>
      )}
      <InnerContainer>
        <MainContainer>
          <FilterBtnBox>
            <Button
              className={tab === "post" ? "clicked" : ""}
              width="100px"
              height="50px"
              fontSize="var(--fs-pc-small)"
              onClick={() => handleTabClick("post")}
            >
              내가 올린 글
            </Button>
            <Button
              className={tab === "give" ? "clicked" : ""}
              width="100px"
              height="50px"
              fontSize="var(--fs-pc-small)"
              onClick={() => handleTabClick("give")}
            >
              간식을 준 글
            </Button>
          </FilterBtnBox>
          {myArticles && myArticles.length === 0 ? (
            <NoArticleContainer>
              <NoContent />
              <span>아직 작성한 글이 없습니다.</span>
            </NoArticleContainer>
          ) : (
            <ImgContainer>
              {myArticles &&
                myArticles.map((article: MyArticles, i) => (
                  <ImgBox
                    key={`${i}-${article.articleId}`}
                    onClick={() => {
                      handleImgBoxClick(article.articleId);
                    }}
                  >
                    <Dim />
                    <SnackCount>
                      {userType === "DOG" ? <BoneWIcon /> : <FishWIcon />}
                      {tab === "give" ? `${article.giveYummyCnt}알 선물` : `${article.yummyCnt}알`}
                    </SnackCount>
                    <ImageCard
                      className="img-card"
                      imgUrl={article.articleImg.images[0].imgUrl}
                      onClick={() => {}}
                    ></ImageCard>
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
            </ImgContainer>
          )}
          <div ref={obsRef} />
        </MainContainer>
      </InnerContainer>
    </>
  );
};

export default MyPageArticles;
