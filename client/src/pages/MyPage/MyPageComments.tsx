import { useState } from "react";
import styled from "styled-components";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";

const CommentContainer = styled.div`
  margin: 50px 150px;
  display: flex;
  justify-content: flex-start;
`;

const CommentBox = styled.div`
  display: flex;
`;

const CommentImg = styled.div`
  margin-right: 40px;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 20px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  margin-bottom: 40px;
`;

const CommentInfo = styled.div`
  display: flex;
`;

const Time = styled.div`
  margin-right: 20px;
  color: var(--color-light-black);
  font-size: var(--fs-pc-small);
`;

const Likes = styled.div`
  font-size: var(--fs-pc-small);
  font-weight: 600;
`;

const MyPageComments = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <InnerContainer>
        <CommentContainer>
          <CommentBox>
            <CommentImg>
              <ImageCard
                className="img-card"
                imgUrl="https://user-images.githubusercontent.com/104997140/202489483-93eaaf70-db42-4b68-a2a6-c04c1dd02e59.jpeg"
                onClick={handleOpen}
              />
            </CommentImg>
            <CommentContent>
              <Content>수영하는 강아지가 귀엽네요^^</Content>
              <CommentInfo>
                <Time>24시간 전</Time>
                <Likes>좋아요 300</Likes>
              </CommentInfo>
            </CommentContent>
          </CommentBox>
        </CommentContainer>
      </InnerContainer>
    </>
  );
};

export default MyPageComments;
