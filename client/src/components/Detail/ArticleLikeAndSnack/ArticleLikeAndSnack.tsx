import { useEffect, useState } from "react";
import ReactionBtn from "../ReactionBtn/ReactionBtn";
import ShortenNumber from "../../../utills/ShortenNumber";
import { PostArticleLike, DeleteArticleLike } from "../../../api/article";

import { useRecoilValue, useRecoilState } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";

import { Wrapper, GroupBtn, GroupCounter, Counter } from "./style";

interface Prop {
  articleId: number | null;
  likeCnt: number;
  yummyCnt?: number;
  authorType: "PERSON" | "CAT" | "DOG";
  gotLiked: boolean;
}

const ArticleLikeAndSnack = ({ articleId = 5, likeCnt, yummyCnt = 0, authorType, gotLiked }: Prop) => {
  const [currentLike, setCurrentLike] = useState<number>(likeCnt);
  const [likeChange, setLikeChange] = useState<number>(1);
  const token = useRecoilValue(accessTokenState);

  const onLike = () => {
    PostArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current + 1);
      })
      .catch((err) => alert("좋아요에 실패했습니다.😿"));
    // setCurrentLike((current) => current + 1);
  };
  const offLike = () => {
    DeleteArticleLike(articleId, token)
      .then((res) => {
        setCurrentLike((current) => current + 1);
      })
      .catch((err) => alert("좋아요 취소에 실패했습니다.😿"));
    // setCurrentLike((current) => current - 1);
  };

  const onSnack = () => {
    console.log("간식주기 켜기");
  };
  const offSnack = () => {
    console.log("간식주기 끄기");
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
            btnId="articleSnack"
            btnType="snack"
            userType={authorType}
            defaultStatus={false}
            onActive={onSnack}
            onInactive={offSnack}
          />
        </GroupBtn>
        <GroupCounter>
          <Counter>좋아요 {ShortenNumber(likeCnt)}</Counter>
          {authorType !== "PERSON" ? <Counter>간식 {ShortenNumber(yummyCnt)}</Counter> : ""}
        </GroupCounter>
      </Wrapper>
    </>
  );
};

export default ArticleLikeAndSnack;
