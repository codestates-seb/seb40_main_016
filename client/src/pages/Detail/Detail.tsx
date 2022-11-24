import { useState, useEffect } from "react";
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

  useEffect(() => {
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
          setComments(res.data.data);
        })
        .catch((e) => {
          alert("댓글 불러오기에 실패했습니다.😿");
        });
    }
  }, [articleId]);

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
          <ArticleAndComments>
            <DetailArticle
              userId={authorId}
              createdAt={data?.createdAt}
              content={data?.content}
              setAuthorType={setAauthorType}
              setAuthorNickname={setAuthorNickname}
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
              articleId={articleId}
              comments={comments}
              setIsMorePopupOn={setIsMorePopupOn}
              setIsMyComment={setIsMyConts}
              setMorePopupType={setContsType}
              setMorePopupId={setContsId}
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
