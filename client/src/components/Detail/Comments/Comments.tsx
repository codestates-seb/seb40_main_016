import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Avatar from "../../Avatar/Avatar";
import ReactionBtn from "../ReactionBtn/ReactionBtn";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";
import { PostCommentLike, DeleteCommentLike } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import userInfoState from "../../../_state/userInfoState";
import isLoginState from "../../../_state/isLoginState";

import { Wrapper, GroupComment, Comment, Conts, GroupConts, Footer, AreaBtn } from "./style";
import { ReactComponent as MoreIcon } from "../../../assets/img/more-icon.svg";
import { CommentType } from "../../../types/comment";

interface Prop {
  articleId: number;
  comments: CommentType[];
  setIsMorePopupOn: Dispatch<SetStateAction<boolean>>;
  setIsMyComment: Dispatch<SetStateAction<boolean>>;
  setMorePopupType: Dispatch<SetStateAction<"article" | "comment">>;
  setMorePopupId: Dispatch<SetStateAction<number>>;
}

const Comments = ({
  articleId,
  comments,
  setIsMorePopupOn,
  setIsMyComment,
  setMorePopupType,
  setMorePopupId,
}: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const myInfo = useRecoilValue(userInfoState);
  const isLogin = useRecoilValue(isLoginState);

  const onCommentLike = (item: CommentType) => {
    PostCommentLike(item.commentId, token)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert("댓글 좋아요에 실패했습니다.😿");
      });
  };
  const offCommentLike = (item: CommentType) => {
    DeleteCommentLike(item.commentId, token)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert("댓글 좋아요 취소에 실패했습니다.😿");
      });
  };

  const checkIsMyComment = (writerId: number) => {
    writerId === myInfo.userId ? setIsMyComment(true) : setIsMyComment(false);
  };

  const onMoreClick = (item: CommentType) => {
    setMorePopupType("comment");
    checkIsMyComment(item.user.userId);
    setMorePopupId(item.commentId);
    setIsMorePopupOn(true);
  };

  return (
    <>
      <Wrapper>
        {comments.map((item, idx) => {
          return (
            <GroupComment key={idx}>
              <Comment>
                <Avatar className="comment-avatar" width="22px" height="22px" bgUrl={item.user.userImg} />
                <Conts>
                  <GroupConts>
                    <span>{item.user.userName}</span>
                    {item.content}
                  </GroupConts>
                  <Footer>
                    <span>{DisplayCreatedAt(item.createdAt)}</span>
                    <strong>좋아요 {item.likeCnt}개</strong>
                    <MoreIcon
                      onClick={() => {
                        onMoreClick(item);
                      }}
                    ></MoreIcon>
                  </Footer>
                </Conts>
                <AreaBtn>
                  <ReactionBtn
                    btnId={`comment-like${item.commentId}`}
                    btnType="like"
                    userType="CAT"
                    defaultStatus={item.gotLiked}
                    onActive={() => {
                      onCommentLike(item);
                    }}
                    onInactive={() => {
                      offCommentLike(item);
                    }}
                    disabled={!isLogin}
                  />
                </AreaBtn>
              </Comment>
            </GroupComment>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Comments;
