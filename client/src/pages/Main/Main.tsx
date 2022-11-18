import { useState } from "react";
import styled from "styled-components";

import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import SortTab from "../../components/SortTab/SortTab";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";

import { ReactComponent as HeartWIcon } from "../../assets/img/heart-w-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as EyeWIcon } from "../../assets/img/eye-w-icon..svg";

import { dummyData } from "./DummyData";

const FilterContainer = styled.main`
  padding: 50px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TabBox = styled.div``;

const SortBox = styled.div`
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    box-shadow: 0px 2px 5px 0px var(--color-gray);

    &.clicked {
      background-color: var(--color-madium-black);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-madium-black);
      }
    }
  }
`;

const ImgContainer = styled.main`
  padding: 0px 0px 50px 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
`;

const ImgBox = styled.div`
  position: relative;

  .img-card {
    max-height: 278px;
    border-radius: 30px;
    box-shadow: 0px 0px 10px 0px var(--color-light-black);
  }
`;

const Dim = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0c0d0e50;

    .info {
      opacity: 1;
    }
  }
`;

const InfoBox = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-white);
  font-size: var(--fs-pc-regular);

  svg {
    margin-right: 5px;
    width: 18px;
  }

  .views {
    width: 20px;
  }
`;

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("new");
  const [tab, setTab] = useState<string>("all");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  const handleSortClick = (sort: "new" | "favorite") => {
    setSort(sort);
  };

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
            {dummyData.map((data) => (
              <ImgBox key={data.id}>
                <Dim>
                  <InfoBox className="info">
                    <Info>
                      <HeartWIcon className="likes" />
                      {data.likes}
                    </Info>
                    <Info>
                      <BoneWIcon className="snacks" />
                      {data.snacks}
                    </Info>
                    <Info>
                      <EyeWIcon className="views" />
                      {data.views}
                    </Info>
                  </InfoBox>
                </Dim>
                <ImageCard className="img-card" imgUrl={data.imgUrl} onClick={handleOpen}></ImageCard>
              </ImgBox>
            ))}
          </ImgContainer>
        </InnerContainer>
      </OuterContainer>
    </div>
  );
};

export default Main;
