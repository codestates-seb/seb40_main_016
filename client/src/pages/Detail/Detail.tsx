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

const Detail = ({ articleId = 1 }) => {
  const token = useRecoilValue(accessTokenState);
  const userInfo = useRecoilValue(userInfoState);
  const [data, setData] = useState<DetailData>();
  const [authorType, setAauthorType] = useState<"PERSON" | "CAT" | "DOG">("PERSON");
  const [authorNickname, setAuthorNickname] = useState<string>("");
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [gotLiked, setGotLiked] = useState<boolean>(false);

  useEffect(() => {
    GetDetail(articleId, token)
      .then((res) => {
        setData(res.data);
        setAuthorId(res.data.user.userId);
        setGotLiked(res.data.gotLiked);
        setLikeCnt(res.data.likeCnt);
      })
      .catch((e) => alert("게시글을 불러오는 데에 실패했습니다😿"));
  }, [articleId]);

  useEffect(() => {
    // console.log(userInfoState);
  }, []);

  return (
    <>
      <Modal
        title={`${authorNickname}님의 글`}
        maxWidth="1137px"
        bg={true}
        isOn={true}
        setIsOn={() => {}}
        onTitleBtnClick={() => {}}
        titleBtn="more"
      >
        <DetailViewer>
          <AreaSlider>
            <DetailSlider
              photos={[
                "https://user-images.githubusercontent.com/104997140/202489483-93eaaf70-db42-4b68-a2a6-c04c1dd02e59.jpeg",
                "https://user-images.githubusercontent.com/104997140/202474784-96d87ed2-2bff-4400-8c18-7045af22dbd6.jpg",
                "https://user-images.githubusercontent.com/104997140/202474820-46aa5ad1-b7cf-4745-ad58-96ce5ac35fe5.jpg",
              ]}
            />
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
