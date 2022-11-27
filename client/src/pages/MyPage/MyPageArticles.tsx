import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import "react-loading-skeleton/dist/skeleton.css";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";

import { ImgContainer, Dim } from "../Main/style";

import accessTokenState from "../../_state/accessTokenState";

import { GetMyArticles } from "../../api/mypage";

import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as FishIcon } from "../../assets/img/fish-icon.svg";
import { ReactComponent as FishWIcon } from "../../assets/img/fish-w-icon.svg";
import { ReactComponent as CrownIcon } from "../../assets/img/crown-icon.svg";

const MostRecieved = styled.div`
  padding: 10px 0px;
  margin: 30px 0px;
  background-color: #f6f6f6;

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
  align-items: flex-end;

  .img-box {
    position: relative;
  }
`;

const FilterBtnBox = styled.div`
  margin: 0px 0px 30px;
  width: 210px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
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

interface Props {
  handleArticlesNum: (arg: number) => void;
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
  userType: "PERSON" | "CAT" | "DOG";
}
interface MyArticles {
  articleId: number;
  articleImg: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
  views: number;
  yummyCnt: number;
}

const MyPageArticles = ({ handleArticlesNum, detailHandler, setArticleId, userType }: Props) => {
  const token = useRecoilValue(accessTokenState);
  const [open, setOpen] = useState<boolean>(false);
  const [myArticles, setMyArticles] = useState<MyArticles[]>([]);
  const [mostReceivedArticles, setMostReceivedArticles] = useState<MyArticles[]>([]);
  const [tab, setTab] = useState<string>("post");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const obsRef = useRef(null);
  const preventRef = useRef(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleImgBoxClick = (articleId: number) => {
    setArticleId(articleId);
    detailHandler();
  };

  const handleTabClick = (tab: "post" | "give" | "take") => {
    setTab(tab);
  };

  useEffect(() => {
    if (page !== 0 && page <= totalPage) getMyArticles();
  }, [page, tab]);

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

  const getMyArticles = () => {
    setLoading(true);
    GetMyArticles(token, tab).then((res: any) => {
      const data = res.data.data;

      const mostReceived = data.slice(0, 5).sort((a: any, b: any) => {
        return b.yummyCnt - a.yummyCnt;
      });

      if (res.data.pageInfo.page === 1) {
        setMyArticles(data);
      } else {
        setMyArticles(myArticles.concat(data));
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
              {mostReceivedArticles.map((article: MyArticles) => (
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
          <ImgContainer>
            {myArticles.map((article: MyArticles) => (
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

export default MyPageArticles;
