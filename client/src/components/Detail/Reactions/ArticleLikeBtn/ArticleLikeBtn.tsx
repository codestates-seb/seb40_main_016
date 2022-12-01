import { Dispatch, useState, SetStateAction, useEffect } from "react";
import { DeleteArticleLike, PostArticleLike } from "../../../../api/article";

import { useRecoilValue, useSetRecoilState } from "recoil";
import mainListState from "../../../../_state/mainLIstState";
import accessTokenState from "../../../../_state/accessTokenState";
import isLoginState from "../../../../_state/isLoginState";

import { Articles, DetailData } from "../../../../types/article";

import { Button } from "./style";
import { ReactComponent as HeartIcon } from "../../../../assets/img/heart-icon.svg";
import { ReactComponent as HeartActiveIcon } from "../../../../assets/img/heart-color-icon.svg";

interface Prop {
  articleData: DetailData;
  articleId: number;
  setCurrentLike: Dispatch<SetStateAction<number>>;
}

const ArticleLikeBtn = ({ articleData, articleId, setCurrentLike }: Prop) => {
  const setMainList = useSetRecoilState<Articles[]>(mainListState);
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);
  const [isLike, setIsOn] = useState<boolean>(false);

  const handleLike = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      PostArticleLike(articleId, token)
        .then((res) => {
          setCurrentLike((current) => current + 1);
          setMainList((prev) =>
            prev.map((article) => {
              if (article.articleId === articleId) article.likeCnt += 1;
              return article;
            }),
          );
          setIsOn(true);
        })
        .catch((err) => {
          alert("좋아요에 실패했습니다.😿");
        });
    }
  };

  const handleLikeCancel = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      DeleteArticleLike(articleId, token)
        .then((res) => {
          setCurrentLike((current) => current - 1);
          setMainList((prev) =>
            prev.map((article) => {
              if (article.articleId === articleId) article.likeCnt -= 1;
              return article;
            }),
          );
          setIsOn(false);
        })
        .catch((err) => alert("좋아요 취소에 실패했습니다.😿"));
    }
  };

  useEffect(() => {
    if (articleData) {
      setIsOn(articleData.gotLiked);
    }
  }, [articleData]);

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

export default ArticleLikeBtn;
