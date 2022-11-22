import ReactionBtn from "../ReactionBtn/ReactionBtn";
import ShortenNumber from "../../../utills/ShortenNumber";

import { Wrapper, GroupBtn, GroupCounter, Counter } from "./style";
import { useState } from "react";

interface Prop {
  likeCnt?: number;
  yummyCnt?: number;
  authorType: "PERSON" | "CAT" | "DOG";
}

const ArticleLikeAndSnack = ({ likeCnt = 0, yummyCnt = 0, authorType }: Prop) => {
  const [currentLike, setCurrentLike] = useState<number>(likeCnt);
  const [likeChange, setLikeChange] = useState<number>(1);

  const onLike = () => {
    console.log("좋아요");
    setCurrentLike((current) => current + 1);
  };
  const offLike = () => {
    console.log("좋아요끄기");
    setCurrentLike((current) => current - 1);
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
            defaultStatus={false}
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
          <Counter>좋아요 {ShortenNumber(currentLike)}</Counter>
          {authorType !== "PERSON" ? <Counter>간식 {ShortenNumber(yummyCnt)}</Counter> : ""}
        </GroupCounter>
      </Wrapper>
    </>
  );
};

export default ArticleLikeAndSnack;
