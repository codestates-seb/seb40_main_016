import { useNavigate } from "react-router-dom";

import Avatar from "../../Avatar/Avatar";
import CommentLikeBtn from "../Reactions/CommentLikeBtn/CommentLikeBtn";
import { PostCommentLike, DeleteCommentLike } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import isLoginState from "../../../_state/isLoginState";
import userInfoState from "../../../_state/userInfoState";

import { GroupComment, Comment, Conts, GroupConts, Footer, AreaBtn } from "./style";
import { ReactComponent as MoreIcon } from "../../../assets/img/more-icon.svg";
import { useEffect, useState } from "react";

interface Prop {
  commentId: number;
  bgUrl: string;
  userName: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  gotLiked: boolean;
  MoreIconClick: () => void;
  userId: number;
  detailHandler: () => void;
}

const CommentItem = ({
  commentId,
  bgUrl,
  userName,
  content,
  createdAt,
  likeCnt,
  gotLiked,
  MoreIconClick,
  userId,
  detailHandler,
}: Prop) => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);
  const myInfo = useRecoilValue(userInfoState);
  const myId = myInfo.userId;
  const [currentLike, setCurrentLike] = useState<number>(0);

  const onCommentLike = () => {
    PostCommentLike(commentId, token)
      .then((res) => {
        setCurrentLike((prev) => prev + 1);
      })
      .catch((e) => {
        alert("댓글 좋아요에 실패했습니다.😿");
      });
  };
  const offCommentLike = () => {
    DeleteCommentLike(commentId, token)
      .then((res) => {
        setCurrentLike((prev) => prev - 1);
      })
      .catch((e) => {
        alert("댓글 좋아요 취소에 실패했습니다.😿");
      });
  };

  const onUserClick = () => {
    detailHandler();
    if (myId === userId) {
      navigate(`/mypage`);
    } else {
      navigate(`/profiles/${userId}`);
    }
  };

  useEffect(() => {
    setCurrentLike(likeCnt);
  }, [likeCnt]);

  return (
    <>
      <GroupComment>
        <Comment>
          <Avatar className="comment-avatar" width="22px" height="22px" bgUrl={bgUrl} onClick={onUserClick} />
          <Conts>
            <GroupConts>
              <span role="presentation" onClick={onUserClick}>
                {userName}
              </span>
              {content}
            </GroupConts>
            <Footer>
              <span>{createdAt}</span>
              <strong>좋아요 {currentLike}개</strong>
              <MoreIcon onClick={MoreIconClick}></MoreIcon>
            </Footer>
          </Conts>
          <AreaBtn>
            <CommentLikeBtn commentId={commentId} setCurrentLike={setCurrentLike} gotLiked={gotLiked} />
          </AreaBtn>
        </Comment>
      </GroupComment>
    </>
  );
};

export default CommentItem;
