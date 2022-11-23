import { useState } from "react";
import styled from "styled-components";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";

import { ImgContainer, Dim, InfoBox, Info } from "../Main/style";

import { ReactComponent as BoneIcon } from "../../assets/img/bone-icon.svg";
import { ReactComponent as BoneWIcon } from "../../assets/img/bone-w-icon.svg";
import { ReactComponent as CrownIcon } from "../../assets/img/crown-icon.svg";

const MostRecieved = styled.div`
  padding: 20px 0px;
  margin: 30px 0px;
  height: 250px;
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

  .avatar {
    margin: 0px 10px;
  }

  .crown-icon {
    margin: 5px 70px 10px;
    width: 30px;
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
    margin-top: 20px;
  }
`;

const AvatarBox = styled.div`
  position: relative;

  .avatar {
    box-shadow: 0px 3px 8px 0px var(--color-light-black);
  }
`;

const AvatarDim = styled.div`
  position: absolute;
  width: 89%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;

  &:hover {
    background-color: #0c0d0e50;
    cursor: pointer;
    opacity: 1;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  .img-box {
    position: relative;
  }
`;

const FilterBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .button {
    margin: 20px 0px 30px 10px;
    height: 50px;
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
`;

const MyPageArticles = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <MostRecieved>
        <InnerContainer>
          <p>가장 간식을 많이 받은 글</p>
          <MostRecievedArticles>
            <CrownIcon className="crown-icon" />
            <ArticleList>
              <Article>
                <AvatarBox>
                  <AvatarDim />
                  <Avatar
                    className="avatar"
                    bgUrl="https://user-images.githubusercontent.com/104997140/202488690-7bdea11c-b1c5-40d4-a5c4-158fdf088cf8.jpeg"
                    width="150px"
                    height="150px"
                  ></Avatar>
                </AvatarBox>
                <div className="avatar-snack">
                  <BoneIcon /> <span>500알</span>
                </div>
              </Article>
              <Article>
                <AvatarBox>
                  <AvatarDim />
                  <Avatar
                    className="avatar"
                    bgUrl="https://user-images.githubusercontent.com/104997140/202488690-7bdea11c-b1c5-40d4-a5c4-158fdf088cf8.jpeg"
                    width="150px"
                    height="150px"
                  ></Avatar>
                </AvatarBox>
                <div className="avatar-snack">
                  <BoneIcon /> <span>500알</span>
                </div>
              </Article>
            </ArticleList>
          </MostRecievedArticles>
        </InnerContainer>
      </MostRecieved>
      <InnerContainer>
        <MainContainer>
          <FilterBtn>
            <Button className="button" width="100px" height="50px" fontSize="var(--fs-pc-small)" onClick={handleOpen}>
              간식을 준 글
            </Button>
            <Button className="button" width="100px" height="50px" fontSize="var(--fs-pc-small)" onClick={handleOpen}>
              내가 올린 글
            </Button>
          </FilterBtn>
          <ImgContainer>
            <ImgBox>
              <Dim>
                <InfoBox>
                  <Info>
                    <BoneWIcon />
                    article.yummyCnt
                  </Info>
                </InfoBox>
              </Dim>
              <SnackCount>
                <BoneWIcon /> 10알
              </SnackCount>
              <ImageCard
                className="img-card"
                imgUrl="https://user-images.githubusercontent.com/104997140/202489483-93eaaf70-db42-4b68-a2a6-c04c1dd02e59.jpeg"
                onClick={handleOpen}
              ></ImageCard>
            </ImgBox>
          </ImgContainer>
        </MainContainer>
      </InnerContainer>
    </>
  );
};

export default MyPageArticles;
