import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { useRecoilState, useRecoilValue } from "recoil";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SortTab from "../../components/SortTab/SortTab";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";
import Banner from "../../components/Banner/Banner";
import NoContent from "../../components/NoContent/NoContent";
import TopButton from "../../components/TopButton/TopButton";

import accessTokenState from "../../_state/accessTokenState";

import {
  FilterContainer,
  TabBox,
  SortBox,
  ImgContainer,
  ImgBox,
  Dim,
  InfoBox,
  Info,
  NoArticleContainer,
} from "./style";

import { ReactComponent as HeartWIcon } from "../../assets/img/heart-w-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as EyeWIcon } from "../../assets/img/eye-w-icon..svg";

import { GetMain } from "../../api/article";
import { Articles } from "../../types/article";
import mainListState from "../../_state/mainLIstState";
interface Prop {
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
}

const Main = ({ detailHandler, setArticleId }: Prop) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>("all");
  const [order, setOrder] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isBannerOn, setIsBannerOn] = useState<boolean>(true);
  const obsRef = useRef(null);
  const [articleLength, setArticleLength] = useState<number>(0);
  const [articles, setMainList] = useRecoilState<Articles[]>(mainListState);
  const token = useRecoilValue(accessTokenState);

  const params = new URLSearchParams(window.location.search);
  const keyword = params.get("search");

  const handleImgBoxClick = (articleId: number) => {
    setArticleId(articleId);
    detailHandler();
  };

  const handleSortClick = async (sortArg: string) => {
    setSort(sortArg);
    getArticles(1, sortArg, order, token, keyword);
  };

  const handleOrderClick = async (orderArg: "latest" | "likes") => {
    setOrder(orderArg);
    getArticles(1, sort, orderArg, token, keyword);
  };

  const getArticles = (page: number, sort: string, order: string, token: string | null, keyword: string) => {
    setLoading(true);

    GetMain(page, sort, order, token, keyword).then((res) => {
      setArticleLength(res.data.data.length);
      if (res.data.pageInfo.page === 1) {
        setMainList(res.data.data);
        setPage(2);
      } else {
        setMainList(articles.concat(res.data.data));
        setPage((prev) => prev + 1);
      }
      setTotalPage(res.data.pageInfo.totalPages);
      setLoading(false);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page <= totalPage) {
        getArticles(page, sort, order, token, keyword);
      }
    });

    if (obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, totalPage, order, sort, keyword, token]);

  useEffect(() => {
    if (keyword) getArticles(1, sort, order, token, keyword);
  }, [keyword]);

  const checkScroll = () => {
    if (window.scrollY < 60) {
      setIsBannerOn(true);
    } else {
      setIsBannerOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    const header = document.querySelector("#header") as HTMLElement;
    const footer = document.querySelector("#footer") as HTMLElement;
    header.style.display = "block";
    footer.style.display = "block";
  }, []);

  return (
    <>
      <Banner
        className={isBannerOn ? "active" : ""}
        onClick={() => {
          navigate("/introduce");
        }}
      />
      <div>
        <OuterContainer style={{ minHeight: "calc(100vh - 150px)" }}>
          <InnerContainer>
            <FilterContainer>
              <TabBox>
                <SortTab handleSortClick={handleSortClick} sort={sort} />
              </TabBox>
              <SortBox>
                <Button
                  className={order === "latest" ? "clicked" : ""}
                  width="90px"
                  height="50px"
                  fontSize="pc-regular"
                  onClick={() => handleOrderClick("latest")}
                >
                  New
                </Button>
                <Button
                  className={order === "likes" ? "clicked" : ""}
                  width="90px"
                  height="50px"
                  fontSize="pc-regular"
                  onClick={() => handleOrderClick("likes")}
                >
                  Favorite
                </Button>
              </SortBox>
            </FilterContainer>
            {articleLength === 0 && !loading ? (
              <NoArticleContainer>
                <NoContent />
                <span>아직 등록된 글이 없습니다.</span>
              </NoArticleContainer>
            ) : (
              <>
                <ImgContainer>
                  {articles.map((article: Articles) => (
                    <ImgBox
                      key={article.articleId}
                      onClick={() => {
                        handleImgBoxClick(article.articleId);
                      }}
                    >
                      <Dim>
                        <InfoBox className="info">
                          <Info>
                            <HeartWIcon className="likes" />
                            {article.likeCnt}
                          </Info>
                          <Info>
                            <BoneWIcon className="snacks" />
                            {article.yummyCnt}
                          </Info>
                          <Info>
                            <EyeWIcon className="views" />
                            {article.views}
                          </Info>
                        </InfoBox>
                      </Dim>
                      <ImageCard
                        className="img-card"
                        imgUrl={article.articleImg.images[0].imgUrl}
                        onClick={() => {}}
                      ></ImageCard>
                    </ImgBox>
                  ))}
                  {loading &&
                    Array(8)
                      .fill(0)
                      .map((_, i) => (
                        <ImgBox key={i}>
                          <ImageSkeleton />
                        </ImgBox>
                      ))}
                </ImgContainer>
              </>
            )}
            <div ref={obsRef} />
            <TopButton />
          </InnerContainer>
        </OuterContainer>
      </div>
    </>
  );
};

export default Main;
