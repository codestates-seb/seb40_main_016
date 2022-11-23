import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Modal from "../../components/Modal/Modal";
import DetailSlider from "../../components/Detail/DetailSlider/DetailSlider";
import DetailArticle from "../../components/Detail/DetailArticle/DetailArticle";
import ArticleLikeAndSnack from "../../components/Detail/ArticleLikeAndSnack/ArticleLikeAndSnack";
import Comments from "../../components/Detail/Comments/Comments";
import CommentAdd from "../../components/Detail/CommentAdd/CommentAdd";
import { GetDetail } from "../../api/article";

import accessTokenState from "../../_state/accessTokenState";
import userInfoState from "../../_state/userInfoState";

import { DetailViewer, AreaSlider, ArticleAndComments } from "./style";

interface DetailData {
  articleId: number;
  articleImg: string[];
  articleStatus: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
  updatedAt: string;
  view: number;
  yummyCnt: number;
}

interface Prop {
  articleId: number;
  isDetailOn: boolean;
  detailHandler: () => void;
}

const Detail = ({ articleId, isDetailOn, detailHandler }: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const userInfo = useRecoilValue(userInfoState);
  const [data, setData] = useState<DetailData>();
  const [authorType, setAauthorType] = useState<"PERSON" | "CAT" | "DOG">("PERSON");
  const [authorNickname, setAuthorNickname] = useState<string>("");
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [gotLiked, setGotLiked] = useState<boolean>(false);
  const [articleImg, setArticleImg] = useState<string[]>([]);

  useEffect(() => {
    if (articleId) {
      GetDetail(articleId, token)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setAuthorId(res.data.user.userId);
          setGotLiked(res.data.gotLiked);
          setLikeCnt(res.data.likeCnt);
          const tempImgArr = [];
          tempImgArr.push(res.data.articleImg);
          setArticleImg(tempImgArr);
        })
        .catch((e) => alert("게시글을 불러오는 데에 실패했습니다😿"));
    }
  }, [articleId]);

  return (
    <>
      <Modal
        title={`${authorNickname}님의 글`}
        maxWidth="1137px"
        bg={true}
        isOn={isDetailOn}
        setIsOn={detailHandler}
        onTitleBtnClick={() => {}}
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
              articleId={articleId}
              likeCnt={likeCnt}
              yummyCnt={data?.yummyCnt}
              authorType={authorType}
              gotLiked={gotLiked}
            />
            <Comments />
            <CommentAdd />
          </ArticleAndComments>
        </DetailViewer>
      </Modal>
    </>
  );
};

export default Detail;
