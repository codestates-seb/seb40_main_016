import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DeleteCommentLike, PostCommentLike } from "../../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../../_state/accessTokenState";
import isLoginState from "../../../../_state/isLoginState";

import { Button } from "./style";
import { ReactComponent as HeartIcon } from "../../../../assets/img/heart-icon.svg";
import { ReactComponent as HeartActiveIcon } from "../../../../assets/img/heart-color-icon.svg";

interface Prop {
  commentId: number;
  setCurrentLike: Dispatch<SetStateAction<number>>;
  gotLiked: boolean;
}

const CommentLikeBtn = ({ commentId, setCurrentLike, gotLiked }: Prop) => {
  const [isLike, setIsOn] = useState<boolean>(false);
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);

  const handleLike = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      PostCommentLike(commentId, token)
        .then((res) => {
          setCurrentLike((prev) => prev + 1);
          setIsOn(true);
        })
        .catch((e) => {
          alert("댓글 좋아요에 실패했습니다.😿");
        });
    }
  };

  const handleLikeCancel = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      DeleteCommentLike(commentId, token)
        .then((res) => {
          setCurrentLike((prev) => prev - 1);
          setIsOn(false);
        })
        .catch((e) => {
          alert("댓글 좋아요 취소에 실패했습니다.😿");
        });
    }
  };

  useEffect(() => {
    setIsOn(gotLiked);
  }, [gotLiked]);

  return (
    <>
      {!isLike ? (
        <Button onClick={handleLike} active={false}>
          <HeartIcon />
        </Button>
      ) : (
        <Button onClick={handleLikeCancel} active={true}>
          <HeartActiveIcon />
        </Button>
      )}
    </>
  );
};

export default CommentLikeBtn;
