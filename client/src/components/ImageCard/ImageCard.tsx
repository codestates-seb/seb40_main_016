/*
담당 : 김윤희
생성 : 2022.11.15
수정 : 2022.11.20 (송인선)
소개 : 이미지카드 컴포넌트
설명 : 
  - 메인페이지, 마이페이지에서 공통적으로 사용되는 이미지카드 컴포넌트입니다.
  - 사용 예시: 
  <ImageCard
    className="image"
    width="300px"
    height="300px"
    imgUrl="이미지 주소"
    onClick={onClick}
  />
  - 수정: width, height의 타입, 고정값 삭제.
  <ImageCard
    className="image"
    imgUrl="이미지 주소"
    onClick={onClick}
  />
  - 수정: img 태그에 loading="lazy" 속성 추가
*/

import styled from "styled-components";

interface ImageCardProps {
  className?: string;
  imgUrl: string;
  onClick: () => void;
}

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

function ImageCard({ className, imgUrl, onClick }: ImageCardProps) {
  return (
    <Wrapper className={className} onClick={onClick}>
      <img src={imgUrl} alt="img" loading="lazy" />
    </Wrapper>
  );
}

export default ImageCard;
