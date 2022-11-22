/*
담당 : 김윤희
생성 : 2022.11.19
수정 : 2022.11.22
소개 : 글 작성 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 글 작성 컴포넌트입니다.
  - 업로드된 파일의 임시주소와 파일 상태를 같이 관리할 수 있도록 수정
  - 사용 예시: <WriteArticle uploadedPhotos={uploadedPhotos} setContent={setContent} index={index} setIndex={setIndex} />
*/

import Avatar from "../../Avatar/Avatar";
import { UploadedPhotos } from "../../../types/article";
import { InnerWrapper, ArticleWrapper, SelectedPhoto, Photo, Profile, Nickname, Textarea } from "./style";
import { ReactComponent as ArrowCircleIcon } from "../../../assets/img/arrow-circle-icon..svg";

interface WriteArticleProps {
  uploadedPhotos: UploadedPhotos[];
  index: number;
  setIndex: (arg: (arg: number) => number) => void;
  setContent: (arg: () => string) => void;
}

const WriteArticle = ({ uploadedPhotos, index, setIndex, setContent }: WriteArticleProps) => {
  return (
    <InnerWrapper>
      {uploadedPhotos.length > 0 && (
        <SelectedPhoto>
          {index > 0 && <ArrowCircleIcon className="prev" onClick={() => setIndex((index) => index - 1)} />}
          <Photo src={uploadedPhotos[index].uploadedPhoto} alt="photo" />
          {index < uploadedPhotos.length - 1 && (
            <ArrowCircleIcon className="next" onClick={() => setIndex((index) => index + 1)} />
          )}
        </SelectedPhoto>
      )}
      <ArticleWrapper>
        <Profile>
          <Avatar width="50px" height="50px" />
          <Nickname>잭슨</Nickname>
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
