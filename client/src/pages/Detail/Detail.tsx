import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Modal from "../../components/Modal/Modal";
import DetailSlider from "../../components/Detail/DetailSlider/DetailSlider";
import DetailArticle from "../../components/Detail/DetailArticle/DetailArticle";
import ArticleLikeAndSnack from "../../components/Detail/ArticleLikeAndSnack/ArticleLikeAndSnack";
import Comments from "../../components/Detail/Comments/Comments";
import CommentAdd from "../../components/Detail/CommentAdd/CommentAdd";
import ExtraFeatureModal from "../../components/Detail/ExtraFeatureModal.tsx/ExtraFeatureModal";
import { GetDetail } from "../../api/article";
import { GetComments } from "../../api/comment";

import accessTokenState from "../../_state/accessTokenState";
import userInfoState from "../../_state/userInfoState";

import { DetailViewer, AreaSlider, ArticleAndComments, ExtraModalWraaper } from "./style";
import { DetailData } from "../../types/article";
import { CommentType } from "../../types/comment";

interface Prop {
  articleId: number;
  isDetailOn: boolean;
  detailHandler: () => void;
}

const Detail = ({ articleId, isDetailOn, detailHandler }: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const myInfo = useRecoilValue(userInfoState);
  const [data, setData] = useState<DetailData>();
  const [authorType, setAauthorType] = useState<"PERSON" | "CAT" | "DOG">("PERSON");
  const [authorNickname, setAuthorNickname] = useState<string>("");
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [gotLiked, setGotLiked] = useState<boolean>(false);
  const [articleImg, setArticleImg] = useState<string[]>([]);
  const myId = myInfo.userId;

  const [comments, setComments] = useState<CommentType[]>([
    {
      commentId: null,
      content: "",
      createdAt: "",
      gotLiked: false,
      likeCnt: null,
      reportCnt: null,
      user: {
        userId: null,
        userImg: "",
        userName: "",
        userStatus: "",
      },
    },
  ]);
  const [commentTotalPage, setCommentTotalPage] = useState<number>(0);
  const [commentCurrentPage, setCommentCurrentPage] = useState<number>(1);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  // states for extra feature popup
  const [isMorePopupOn, setIsMorePopupOn] = useState<boolean>(false);
  const [contsType, setContsType] = useState<"article" | "comment">();
  const [isMyConts, setIsMyConts] = useState<boolean>();
  const [contsId, setContsId] = useState<number>();

  const checkIsMyArticle = () => {
    if (articleId && authorId) {
      if (myInfo.userId === authorId) {
        setIsMyConts(true);
      } else if (myInfo.userId !== authorId) {
        setIsMyConts(false);
      }
      setContsId(articleId);
    }
  };

  const scrollToTop = () => {
    document.querySelector("#scroll-area").scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();

    if (articleId) {
      GetDetail(articleId, token)
        .then((res) => {
          setData(res.data);
          setAuthorId(res.data.user.userId);
          setGotLiked(res.data.gotLiked);
          setLikeCnt(res.data.likeCnt);
          const tempImgArr = [];
          tempImgArr.push(res.data.articleImg);
          setArticleImg(tempImgArr);
        })
        .catch((e) => alert("게시글을 불러오는 데에 실패했습니다😿"));

      GetComments(articleId, 1, token)
        .then((res) => {
          setCommentCurrentPage(1);
          setCommentTotalPage(res.data.pageInfo.totalPages);
          setComments(res.data.data);
          setCommentLoading(false);
        })
        .catch((e) => {
          alert("댓글 불러오기에 실패했습니다.😿");
        });
    }
  }, [articleId]);

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    const endPotintY = document.querySelector("#end-point").getBoundingClientRect();
    const basePointY = document.querySelector("#base-point").getBoundingClientRect();

    if (!commentLoading && commentCurrentPage !== commentTotalPage && endPotintY.bottom === basePointY.top) {
      setCommentCurrentPage((prev) => prev + 1);
      setCommentLoading(true);
      GetComments(articleId, commentCurrentPage, token)
        .then((res) => {
          setComments((prev) => [...prev, ...res.data.data]);
          setCommentLoading(false);
        })
        .catch((e) => {
          alert("댓글 불러오기에 실패했습니다.😿");
        });
    }
  };

  return (
    <>
      <Modal
        title={`${authorNickname}님의 글`}
        maxWidth="960px"
        bg={true}
        isOn={isDetailOn}
        setIsOn={detailHandler}
        onTitleBtnClick={() => {
          setContsType("article");
          checkIsMyArticle();
          setIsMorePopupOn(true);
        }}
        titleBtn="more"
      >
        <DetailViewer>
          <AreaSlider>
            <DetailSlider photos={articleImg} />
          </AreaSlider>
          <ArticleAndComments id="scroll-area" onScroll={onScroll}>
            <DetailArticle
              userId={authorId}
              createdAt={data?.createdAt}
              content={data?.content}
              setAuthorType={setAauthorType}
              setAuthorNickname={setAuthorNickname}
              detailHandler={detailHandler}
              myId={myId}
            />
            <ArticleLikeAndSnack
              authorId={authorId}
              articleId={articleId}
              likeCnt={likeCnt}
              yummyCnt={data?.yummyCnt}
              authorType={authorType}
              gotLiked={gotLiked}
            />
            <Comments
              comments={comments}
              setIsMorePopupOn={setIsMorePopupOn}
              setIsMyComment={setIsMyConts}
              setMorePopupType={setContsType}
              setMorePopupId={setContsId}
              commentLoading={commentLoading}
            />
            <CommentAdd articleId={articleId} setComments={setComments} />
          </ArticleAndComments>
        </DetailViewer>
      </Modal>
      <ExtraModalWraaper>
        <ExtraFeatureModal
          className={"extra-feature-modal"}
          type={contsType}
          isMy={isMyConts}
          isOn={isMorePopupOn}
          contsId={contsId}
          setIsOn={setIsMorePopupOn}
          setComments={setComments}
          articleId={articleId}
        />
      </ExtraModalWraaper>
    </>
  );
};

export default Detail;
