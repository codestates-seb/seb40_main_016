/*
담당 : 김윤희
생성 : 2022.11.17
수정 : 2022.11.18
소개 : 이미지 미리보기 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 이미지 미리보기 컴포넌트입니다.
  - 사용 예시: <PhotoPreview photoUrl={photo} deletePhoto={deletePhoto} setCurrentPhotos={setCurrentPhotos} />
*/

import styled from "styled-components";
import { ReactComponent as CloseBtn } from "../../../assets/img/close-icon.svg";

interface PhotoPreviewProps {
  photoUrl: string;
  deletePhoto: () => void;
  setCurrentPhotos: (arg: () => string) => void;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-right: 10px;
  z-index: 5;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 1;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    padding: 10px;
  }
`;

const PhotoPreview = ({ photoUrl, deletePhoto, setCurrentPhotos }: PhotoPreviewProps) => {
  return (
    <Wrapper onClick={() => setCurrentPhotos(() => photoUrl)}>
      <img src={photoUrl} alt="preview" />
      <CloseBtn onClick={deletePhoto} width="20px" />
    </Wrapper>
  );
};

export default PhotoPreview;
