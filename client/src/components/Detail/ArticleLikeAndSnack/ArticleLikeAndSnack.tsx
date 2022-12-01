import { useEffect, useState } from "react";
import ReactionBtn from "../ReactionBtn/ReactionBtn";
import ShortenNumber from "../../../utills/ShortenNumber";
import { PostArticleLike, DeleteArticleLike } from "../../../api/article";
import { GetIsSubscribe, PostSubscribe, DeleteSubscribe } from "../../../api/subscribe";

import { useRecoilValue, useSetRecoilState } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import userInfoState from "../../../_state/userInfoState";
import isLoginState from "../../../_state/isLoginState";

import { Wrapper, GroupBtn, GroupCounter, Counter } from "./style";
import { Articles } from "../../../types/article";
import mainListState from "../../../_state/mainLIstState";

interface Prop {
  authorId: number;
  articleId: number | null;
  likeCnt: number;
  yummyCnt?: number;
  authorType: "PERSON" | "CAT" | "DOG";
  gotLiked: boolean;
}

const ArticleLikeAndSnack = ({ authorId, articleId = 5, likeCnt, yummyCnt = 0, authorType, gotLiked }: Prop) => {
  const [currentLike, setCurrentLike] = useState<number>();
  const [currentSnack, setCurrentSnack] = useState<number>();
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [isMy, setIsMy] = useState<boolean>(false);
  const token = useRecoilValue(accessTokenState);
  const myinfo = useRecoilValue(userInfoState);
  const isLogin = useRecoilValue(isLoginState);

  const setMainList = useSetRecoilState<Articles[]>(mainListState);

  const checkCanSubscribe = () => {
    if (myinfo.userId === authorId) {
      setIsMy(true);
    } else {
      setIsMy(false);
    }
  };

  const checkAlreadySubscribe = () => {
    GetIsSubscribe(myinfo.userId, authorId)
      .then((res) => {
        if (res.data === "ok") {
          setIsSubscribing(true);
        } else {
          setIsSubscribing(false);
        }
      })
      .catch((e) => alert("구독 여부 확인에 실패했습니다.😿"));
  };

  useEffect(() => {
    checkCanSubscribe();
    if (myinfo.userId && authorId) {
      checkAlreadySubscribe();
    }
  }, [authorId]);

  useEffect(() => {
    setCurrentLike(likeCnt);
    setCurrentSnack(yummyCnt);
  }, [likeCnt, yummyCnt]);

  const onLike = () => {
    PostArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current + 1);
        setMainList((prev) =>
          prev.map((article) => {
            if (article.articleId === articleId) article.likeCnt += 1;
            return article;
          }),
        );
      })
      .catch((err) => {
        console.log(err);
        alert("좋아요에 실패했습니다.😿");
      });
  };
  const offLike = () => {
    DeleteArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current - 1);
        setMainList((prev) =>
          prev.map((article) => {
            if (article.articleId === articleId) article.likeCnt -= 1;
            return article;
          }),
        );
      })
      .catch((err) => alert("좋아요 취소에 실패했습니다.😿"));
  };

  const onSubscribe = () => {
    PostSubscribe(myinfo.userId, authorId, token)
      .then((res) => {
        return res;
      })
      .catch((err) => alert("구독에 실패했습니다.😿"));
  };
  const offSubscribe = () => {
    DeleteSubscribe(myinfo.userId, authorId, token)
      .then((res) => {
        return res;
      })
      .catch((err) => alert("구독에 실패했습니다.😿"));
  };

  const updateSnack = (value: number) => {
    setCurrentSnack(currentSnack + value);
    setMainList((prev) =>
      prev.map((article) => {
        if (article.articleId === articleId) article.yummyCnt += value;
        return article;
      }),
    );
  };

  return (
    <>
      <Wrapper>
        <GroupBtn>
          <ReactionBtn
            btnId="articleLike"
            btnType="like"
            userType={authorType}
            defaultStatus={gotLiked}
            onActive={onLike}
            onInactive={offLike}
            disabled={!isLogin}
          />
          {!isMy ? (
            <ReactionBtn
              className="snack"
              btnId="articleSnack"
              btnType="snack"
              userType={authorType}
              defaultStatus={false}
              disabled={!isLogin}
              articleId={articleId}
              updateSnack={updateSnack}
            />
          ) : null}
        </GroupBtn>
        <GroupCounter>
          <Counter>좋아요 {ShortenNumber(currentLike)}</Counter>
          {authorType !== "PERSON" ? <Counter>간식 {ShortenNumber(currentSnack)}</Counter> : ""}
        </GroupCounter>
        {!isMy ? (
          <ReactionBtn
            className="subscribe"
            btnId="subscribe"
            btnType="subscribe"
            userType={authorType}
            defaultStatus={isSubscribing}
            onActive={onSubscribe}
            onInactive={offSubscribe}
            disabled={!isLogin}
          />
        ) : null}
      </Wrapper>
    </>
  );
};

export default ArticleLikeAndSnack;
