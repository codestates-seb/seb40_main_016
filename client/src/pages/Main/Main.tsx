import { useEffect, useState } from "react";
import styled from "styled-components";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SortTab from "../../components/SortTab/SortTab";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";

import { ReactComponent as HeartWIcon } from "../../assets/img/heart-w-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as EyeWIcon } from "../../assets/img/eye-w-icon..svg";

import { FilterContainer, TabBox, SortBox, ImgContainer, ImgBox, Dim, InfoBox, Info } from "./style";

import { GetMain } from "../../api/api";

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("new");
  const [tab, setTab] = useState<string>("all");
  const [articles, setArticles] = useState<Articles[]>([]);

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

  useEffect(() => {
    GetMain(1, 12).then((res: any) => {
      console.log(res.data.data);
      setArticles(res.data.data);
    });
  }, []);

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
                        {article.view}
                      </Info>
                    </InfoBox>
                  </Dim>
                  <ImageCard className="img-card" imgUrl={article.articleImg} onClick={handleOpen}></ImageCard>
                </ImgBox>
              ))}
          </ImgContainer>
        </InnerContainer>
      </OuterContainer>
    </div>
  );
};

export default Main;
