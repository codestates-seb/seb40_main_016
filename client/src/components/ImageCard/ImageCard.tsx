/*
담당 : 김윤희
생성 : 2022.11.15
수정 : -
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
*/

import styled, { css } from "styled-components";

interface ImageCardProps {
  className?: string;
  width?: string;
  height?: string;
  imgUrl: string;
  onClick: () => void;
}

const Wrapper = styled.div<{ width?: string; height?: string }>`
  cursor: pointer;

  ${({ width = "250px", height = "250px" }) => css`
    width: ${width};
    height: ${height};
  `}

  img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
`;

function ImageCard({ className, width, height, imgUrl, onClick }: ImageCardProps) {
  return (
    <Wrapper className={className} width={width} height={height} onClick={onClick}>
      <img src={imgUrl} alt="img" />
    </Wrapper>
  );
}

export default ImageCard;
