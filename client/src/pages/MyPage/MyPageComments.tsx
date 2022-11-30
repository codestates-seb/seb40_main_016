import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import DisplayCreatedAt from "../../utills/DisplayCreatedAt";
import NoContent from "../../components/NoContent/NoContent";
import ImageSkeleton from "../../components/Skeleton/ImageSkeleton";

import { GetMyComments } from "../../api/mypage";

import accessTokenState from "../../_state/accessTokenState";

import { ArticleImg } from "../../types/article";

const CommentContainer = styled.div`
  min-height: 40vh;
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
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 736px) {
    width: 70%;
  }
`;

const Content = styled.span`
  margin-bottom: 40px;
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

const NoCommentContainer = styled.div`
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

interface Prop {
  detailHandler: () => void;
  setArticleId: Dispatch<SetStateAction<number>>;
}
interface MyComments {
  articleId: number;
  articleImg: ArticleImg;
  commentId: number;
  commentStatus: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
}

const MyPageComments = ({ detailHandler, setArticleId }: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const [open, setOpen] = useState<boolean>(false);
  const [myComments, setMyComments] = useState<MyComments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetMyComments(token).then((res: any) => {
      setMyComments(res.data.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    DisplayCreatedAt("");
  }, []);

  const handleImgBoxClick = (articleId: number) => {
    setArticleId(articleId);
    detailHandler();
  };

  return (
    <>
      <InnerContainer>
        <CommentContainer>
          {myComments.length === 0 && !loading ? (
            <NoCommentContainer>
              <NoContent />
              <span>아직 작성한 댓글이 없습니다.</span>
            </NoCommentContainer>
          ) : (
            <>
              {myComments.map((comment: MyComments) => (
                <CommentBox key={comment.commentId}>
                  <CommentImgBox>
                    <CommentImg
                      onClick={() => {
                        handleImgBoxClick(comment.articleId);
                      }}
                    >
                      <ImageCard
                        className="img-card"
                        imgUrl={comment.articleImg.images[0].imgUrl}
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
            </>
          )}
        </CommentContainer>
      </InnerContainer>
    </>
  );
};

export default MyPageComments;
