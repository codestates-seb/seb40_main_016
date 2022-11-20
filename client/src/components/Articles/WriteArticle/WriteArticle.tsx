/*
담당 : 김윤희
생성 : 2022.11.19
수정 : 
소개 : 글 작성 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 글 작성 컴포넌트입니다.
  - 사용 예시: <WriteArticle uploadedPhotos={uploadedPhotos} setContent={setContent} />
*/

import { useState } from "react";
import Avatar from "../../Avatar/Avatar";
import { InnerWrapper, ArticleWrapper, SelectedPhoto, Photo, Profile, Nickname, Textarea } from "./style";
import { ReactComponent as ArrowCircleIcon } from "../../../assets/img/arrow-circle-icon..svg";

interface WriteArticleProps {
  uploadedPhotos: string[];
  setContent: (arg: string) => void;
}

const WriteArticle = ({ uploadedPhotos, setContent }: WriteArticleProps) => {
  const [index, setIndex] = useState<number>(0);

  const increaseIndex = () => index > 0 && setIndex((index) => index - 1);
  const decreaseIndex = () => index < uploadedPhotos.length - 1 && setIndex((index) => index + 1);

  return (
    <InnerWrapper>
      {uploadedPhotos.length > 0 && (
        <SelectedPhoto>
          <ArrowCircleIcon className="prev" onClick={increaseIndex} />
          <Photo src={uploadedPhotos[index]} alt="photo" />
          <ArrowCircleIcon className="next" onClick={decreaseIndex} />
        </SelectedPhoto>
      )}
      <ArticleWrapper>
        <Profile>
          <Avatar width="50px" height="50px" />
          <Nickname>잭슨</Nickname>
        </Profile>
        <Textarea placeholder="글 입력" onChange={(e) => setContent(e.target.value)} />
      </ArticleWrapper>
    </InnerWrapper>
  );
};

export default WriteArticle;
