import { useEffect, useState } from "react";
import ReactionBtn from "../ReactionBtn/ReactionBtn";
import ShortenNumber from "../../../utills/ShortenNumber";
import { PostArticleLike, DeleteArticleLike } from "../../../api/article";
import { GetIsSubscribe, PostSubscribe, DeleteSubscribe } from "../../../api/subscribe";

import { useRecoilValue, useRecoilState } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import userInfoState from "../../../_state/userInfoState";

import { Wrapper, GroupBtn, GroupCounter, Counter } from "./style";

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
  const [isSnackPopOn, setIsSnackPopOn] = useState<boolean>(false);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [canSubscribe, setCanSubscribe] = useState<boolean>(false);
  const token = useRecoilValue(accessTokenState);
  const myinfo = useRecoilValue(userInfoState);

  const checkCanSubscribe = () => {
    if (myinfo.userId === authorId) {
      setCanSubscribe(false);
    } else {
      setCanSubscribe(true);
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
    if (myinfo && authorId) {
      checkCanSubscribe();
      checkAlreadySubscribe();
    }
  }, [authorId]);

  useEffect(() => {
    setCurrentLike(likeCnt);
  }, [likeCnt]);

  const onLike = () => {
    PostArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current + 1);
      })
      .catch((err) => alert("좋아요에 실패했습니다.😿"));
  };
  const offLike = () => {
    DeleteArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current - 1);
      })
      .catch((err) => alert("좋아요 취소에 실패했습니다.😿"));
  };

  const onSnack = () => {
    console.log("간식주기 켜기");
  };
  const offSnack = () => {
    console.log("간식주기 끄기");
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
          />
          <ReactionBtn
            className="snack"
            btnId="articleSnack"
            btnType="snack"
            userType={authorType}
            defaultStatus={isSnackPopOn}
            onActive={onSnack}
            onInactive={offSnack}
          />
        </GroupBtn>
        <GroupCounter>
          <Counter>좋아요 {ShortenNumber(currentLike)}</Counter>
          {authorType !== "PERSON" ? <Counter>간식 {ShortenNumber(yummyCnt)}</Counter> : ""}
        </GroupCounter>
        {canSubscribe ? (
          <ReactionBtn
            className="subscribe"
            btnId="subscribe"
            btnType="subscribe"
            userType={authorType}
            defaultStatus={isSubscribing}
            onActive={onSubscribe}
            onInactive={offSubscribe}
          />
        ) : null}
      </Wrapper>
    </>
  );
};

export default ArticleLikeAndSnack;
