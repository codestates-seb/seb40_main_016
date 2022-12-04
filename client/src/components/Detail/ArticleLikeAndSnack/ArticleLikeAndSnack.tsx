import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ArticleLikeBtn from "../Reactions/ArticleLikeBtn/ArticleLikeBtn";
import SnackBtn from "../Reactions/SnackBtn/SnackBtn";
import SubscribeBtn from "../Reactions/SubscribeBtn/SubscribeBtn";
import ShortenNumber from "../../../utills/ShortenNumber";

import userInfoState from "../../../_state/userInfoState";

import { Wrapper, GroupBtn, GroupCounter, Counter } from "./style";
import { DetailData } from "../../../types/article";

interface Prop {
  articleData: DetailData;
  authorType: "PERSON" | "CAT" | "DOG";
}

const ArticleLikeAndSnack = ({ articleData, authorType }: Prop) => {
  const myInfo = useRecoilValue(userInfoState);
  const myId = myInfo.userId;
  const [currentLike, setCurrentLike] = useState<number>();
  const [currentSnack, setCurrentSnack] = useState<number>();
  const [isMy, setIsMy] = useState<boolean>(false);

  useEffect(() => {
    if (articleData) {
      setCurrentLike(articleData.likeCnt);
      setCurrentSnack(articleData.yummyCnt);

      if (myId === articleData.user.userId) {
        setIsMy(true);
      } else {
        setIsMy(false);
      }
    }
  }, [articleData]);

  return (
    <>
      <Wrapper>
        <GroupBtn>
          <ArticleLikeBtn
            articleData={articleData}
            articleId={articleData?.articleId}
            setCurrentLike={setCurrentLike}
          />
          {!isMy && authorType !== "PERSON" ? (
            <SnackBtn articleId={articleData?.articleId} authorType={authorType} setCurrentSnack={setCurrentSnack} />
          ) : null}
        </GroupBtn>
        <GroupCounter>
          <Counter>좋아요 {ShortenNumber(currentLike)}</Counter>
          {authorType !== "PERSON" ? <Counter>간식 {ShortenNumber(currentSnack)}</Counter> : ""}
        </GroupCounter>
        {!isMy ? <SubscribeBtn userId={myId} authorId={articleData?.user.userId} /> : null}
      </Wrapper>
    </>
  );
};

export default ArticleLikeAndSnack;
