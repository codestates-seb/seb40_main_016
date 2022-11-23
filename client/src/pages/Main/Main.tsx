import { useEffect, useState, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SortTab from "../../components/SortTab/SortTab";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";

import { FilterContainer, TabBox, SortBox, ImgContainer, ImgBox, Dim, InfoBox, Info } from "./style";

import { ReactComponent as HeartWIcon } from "../../assets/img/heart-w-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as EyeWIcon } from "../../assets/img/eye-w-icon..svg";

import { GetMain } from "../../api/article";

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("all");
  const [order, setOrder] = useState<string>("latest");
  const [articles, setArticles] = useState<Articles[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const obsRef = useRef(null);
  const preventRef = useRef(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSortClick = (sort: string) => {
    setSort(sort);
    setPage(1);
  };

  const handleOrderClick = (order: "latest" | "likes") => {
    setOrder(order);
    setPage(1);
  };

  interface Articles {
    articleId: number;
    articleImg: string;
    content: string;
    likeCnt: number;
    views: number;
    reportCnt: number;
    articleStatus: string;
    yummyCnt: number;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler);
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page !== 0 && page <= totalPage) getArticles();
  }, [page]);

  useEffect(() => {
    if (page !== 0) getArticles();
  }, [sort, order]);

  const obsHandler = (entries: any) => {
    const target = entries[0];

    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const getArticles = () => {
    setLoading(true);
    GetMain(page, sort, order).then((res: any) => {
      if (res.data.pageInfo.page === 1) {
        setArticles(res.data.data);
      } else {
        setArticles(articles.concat(res.data.data));
      }
      preventRef.current = true;
      setTotalPage(res.data.pageInfo.totalPages);
      setLoading(false);
    });
  };

  return (
    <div>
      <OuterContainer>
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
          <ImgContainer>
            {articles &&
              articles.map((article: Articles) => (
                <ImgBox key={article.articleId}>
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
        </InnerContainer>
      </OuterContainer>
    </div>
  );
};

export default Main;
