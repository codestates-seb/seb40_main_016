import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import DisplayCreatedAt from "../../utills/DisplayCreatedAt";

import { GetMyComments } from "../../api/mypage";

import accessTokenState from "../../_state/accessTokenState";

const CommentContainer = styled.div`
  margin: 50px 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: 736px) {
    margin: 20px 10px 50px;
  }
`;

const CommentBox = styled.div`
  margin: 10px 0px;
  width: 100%;
  display: flex;
`;

const CommentImgBox = styled.div`
  margin-right: 40px;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 736px) {
    margin-right: 20px;
  }
`;

const CommentImg = styled.div`
  overflow: hidden;
  border-radius: 20px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.span`
  margin-bottom: 40px;
  max-width: 189px;

  @media screen and (max-width: 736px) {
    margin-bottom: 20px;
    font-size: var(--fs-pc-small);
  }
`;

const CommentInfo = styled.div`
  display: flex;

  @media screen and (max-width: 736px) {
    flex-direction: column;
  }
`;

const Time = styled.div`
  margin-right: 50px;
  color: var(--color-light-black);
  font-size: var(--fs-pc-small);

  @media screen and (max-width: 736px) {
    margin-bottom: 20px;
  }
`;

const Likes = styled.div`
  font-size: var(--fs-pc-small);
  font-weight: 600;
`;
interface MyComments {
  commentId: number;
  commentStatus: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
}

const MyPageComments = () => {
  const token = useRecoilValue(accessTokenState);
  const [open, setOpen] = useState<boolean>(false);
  const [myComments, setMyComments] = useState<MyComments[]>([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetMyComments(token).then((res: any) => {
      console.log(res.data.data);
      setMyComments(res.data.data);
    });
  }, []);

  useEffect(() => {
    DisplayCreatedAt("");
  }, []);

  return (
    <>
      <InnerContainer>
        <CommentContainer>
          {myComments.map((comment: MyComments) => (
            <CommentBox key={comment.commentId}>
              <CommentImgBox>
                <CommentImg>
                  <ImageCard
                    className="img-card"
                    imgUrl="https://user-images.githubusercontent.com/104997140/202489483-93eaaf70-db42-4b68-a2a6-c04c1dd02e59.jpeg"
                    onClick={handleOpen}
                  />
                </CommentImg>
              </CommentImgBox>
              <CommentContent>
                <Content>{comment.content}</Content>
                <CommentInfo>
                  <Time>{DisplayCreatedAt(comment.createdAt)}</Time>
                  <Likes>좋아요 {comment.likeCnt}개</Likes>
                </CommentInfo>
              </CommentContent>
            </CommentBox>
          ))}
        </CommentContainer>
      </InnerContainer>
    </>
  );
};

export default MyPageComments;
