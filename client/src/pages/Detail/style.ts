import styled from "styled-components";

export const DetailViewer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 736px) {
    flex-direction: row;
  }
`;

export const AreaSlider = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  @media screen and (min-width: 736px) {
    width: 56.8vw;
    max-width: 630px;
  }
`;

export const ArticleAndComments = styled.div`
  position: relative;
  aspect-ratio: 1;
  box-sizing: border-box;
  width: 100%;
  max-height: 630px;
  overflow: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;