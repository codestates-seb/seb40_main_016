/*
담당 : 김윤희
생성 : 2022.11.19
수정 : 2022.11.28
소개 : 글 작성 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 글 작성 컴포넌트입니다.
  - 업로드된 파일의 임시주소와 파일 상태를 같이 관리할 수 있도록 수정
  - 유저 네임, 이미지 전역에 저장된 값 가져오도록 수정
  - 사용 예시: <WriteArticle uploadedPhotos={uploadedPhotos} content={content} setContent={setContent} index={index} setIndex={setIndex} />
*/

import { useRecoilValue } from "recoil";

import Avatar from "../../Avatar/Avatar";
import DetailSlider from "../../Detail/DetailSlider/DetailSlider";

import { UploadedPhotos } from "../../../types/article";
import { InnerWrapper, ArticleWrapper, SelectedPhoto, Profile, Nickname, Textarea } from "./style";
import userInfoState from "../../../_state/userInfoState";

interface WriteArticleProps {
  uploadedPhotos: UploadedPhotos[];
  content: string;
  setContent: (arg: () => string) => void;
}

const WriteArticle = ({ uploadedPhotos, content, setContent }: WriteArticleProps) => {
  const { userName, userImg } = useRecoilValue(userInfoState);

  return (
    <InnerWrapper>
      <SelectedPhoto>
        {/* TODO: api 변경으로 오류남 DetailSlider에 photos 아래와 같은 형식으로 들어와야 함
        photos: [{
          articleImgId: number;
          imgUrl: string;
        }]
        */}
        {/* {uploadedPhotos.length > 0 && <DetailSlider photos={uploadedPhotos.map((photo) => photo.uploadedPhoto)} />} */}
      </SelectedPhoto>
      <ArticleWrapper>
        <Profile>
          <Avatar width="50px" height="50px" bgUrl={userImg} />
          <Nickname>{userName}</Nickname>
        </Profile>
        <Textarea
          placeholder="글 입력"
          maxLength={500}
          defaultValue={content}
          onChange={(e) => setContent(() => e.target.value)}
        />
      </ArticleWrapper>
    </InnerWrapper>
  );
};

export default WriteArticle;
