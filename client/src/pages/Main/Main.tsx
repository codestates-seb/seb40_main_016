import { useEffect, useState, useRef, Suspense } from "react";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SortTab from "../../components/SortTab/SortTab";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";

import { FilterContainer, TabBox, SortBox, ImgContainer, ImgBox, Dim, InfoBox, Info } from "./style";

import { ReactComponent as HeartWIcon } from "../../assets/img/heart-w-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as EyeWIcon } from "../../assets/img/eye-w-icon..svg";

import { GetMain } from "../../api/api";

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("new");
  const [tab, setTab] = useState<string>("all");
  const [articles, setArticles] = useState<Articles[]>([]);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState<boolean>(false);
  const preventRef = useRef<boolean>(true);
  const endRef = useRef<boolean>(false);
  const [lastIntersecting, setLastIntersecting] = useState<HTMLElement | null>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  const handleSortClick = (sort: "new" | "favorite") => {
    setSort(sort);
  };

  interface Articles {
    articleId: number;
    articleImg: string;
    content: string;
    likeCnt: number;
    view: number;
    reportCnt: number;
    articleStatus: string;
    yummyCnt: number;
  }

  const getArticles = () => {
    console.log(articles);
    setLoad(true);
    GetMain(page).then((res: any) => {
      if (res.data) {
        if (res.data.end) {
          endRef.current = true;
        }
        setArticles(articles.concat(res.data.data));
        preventRef.current = true;
      }
      setLoad(false);
    });
  };

  const onIntersect = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    getArticles();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    if (lastIntersecting) {
      observer.observe(lastIntersecting);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersecting]);

  return (
    <div>
      <OuterContainer>
        <InnerContainer>
          <FilterContainer>
            <TabBox>
              <SortTab handleTabClick={handleTabClick} tab={tab} />
            </TabBox>
            <SortBox>
              <Button
                className={sort === "new" ? "clicked" : ""}
                width="90px"
                height="50px"
                fontSize="pc-regular"
                onClick={() => handleSortClick("new")}
              >
                New
              </Button>
              <Button
                className={sort === "favorite" ? "clicked" : ""}
                width="90px"
                height="50px"
                fontSize="pc-regular"
                onClick={() => handleSortClick("favorite")}
              >
                Favorite
              </Button>
            </SortBox>
          </FilterContainer>
          <ImgContainer>
            {articles &&
              articles.map((article: Articles) => (
                <ImgBox key={article.articleId} ref={setLastIntersecting}>
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
                        {article.view}
                      </Info>
                    </InfoBox>
                  </Dim>
                  <ImageCard className="img-card" imgUrl={article.articleImg} onClick={handleOpen}></ImageCard>
                </ImgBox>
              ))}
            {load ? <div>로딩 중</div> : <></>}
            {/* <div ref={setLastIntersecting}></div> */}
          </ImgContainer>
        </InnerContainer>
      </OuterContainer>
    </div>
  );
};

export default Main;
