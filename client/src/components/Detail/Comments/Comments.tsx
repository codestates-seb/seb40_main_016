import { Dispatch, SetStateAction } from "react";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";
import Loading from "../../Loading/Loading";
import CommentItem from "../CommentItem/CommentItem";

import { useRecoilValue } from "recoil";
import userInfoState from "../../../_state/userInfoState";

import { Wrapper, NoComments, EndPoint } from "./style";
import { CommentType } from "../../../types/comment";

interface Prop {
  comments: CommentType[];
  setIsMorePopupOn: Dispatch<SetStateAction<boolean>>;
  setIsMyComment: Dispatch<SetStateAction<boolean>>;
  setMorePopupType: Dispatch<SetStateAction<"article" | "comment">>;
  setMorePopupId: Dispatch<SetStateAction<number>>;
  commentLoading: boolean;
  setCommentConts: Dispatch<SetStateAction<string>>;
}

const Comments = ({
  comments,
  setIsMorePopupOn,
  setIsMyComment,
  setMorePopupType,
  setMorePopupId,
  commentLoading,
  setCommentConts,
}: Prop) => {
  const myInfo = useRecoilValue(userInfoState);

  const checkIsMyComment = (writerId: number) => {
    writerId === myInfo.userId ? setIsMyComment(true) : setIsMyComment(false);
  };

  const onMoreClick = (item: CommentType) => {
    setMorePopupType("comment");
    checkIsMyComment(item.user.userId);
    setMorePopupId(item.commentId);
    setIsMorePopupOn(true);

    if (item.user.userId === myInfo.userId) {
      setCommentConts(item.content);
    }
  };

  return (
    <>
      <Wrapper>
        {comments.length === 0 ? (
          <NoComments>
            <img src="./assets/no-comments-clipart.png" alt="" />
            <small>
              아직 댓글이 없습니다.
              <br />첫 댓글을 남겨보세요!
            </small>
          </NoComments>
        ) : (
          comments.map((item) => {
            return (
              <CommentItem
                key={item.commentId}
                commentId={item.commentId}
                bgUrl={item.user.userImg}
                userName={item.user.userName}
                content={item.content}
                createdAt={DisplayCreatedAt(item.createdAt)}
                likeCnt={item.likeCnt}
                gotLiked={item.gotLiked}
                MoreIconClick={() => {
                  onMoreClick(item);
                }}
              />
            );
          })
        )}
        {commentLoading ? <Loading /> : null}
        <EndPoint id="end-point" />
      </Wrapper>
    </>
  );
};

export default Comments;
