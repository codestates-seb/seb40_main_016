import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  .swiper {
    position: relative;
    .swiper-slide {
      display: flex;
      align-items: stretch;
      justify-content: stretch;

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }
    .swiper-pagination-bullet {
      background: var(--color-white);
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: var(--color-sky);
    }
  }
`;

interface NaviagationProp {
  direction: "prev" | "next";
}

export const NavigationBtn = styled.div<NaviagationProp>`
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 35px;
  cursor: pointer;

  ${(props) =>
    props.direction === "prev" &&
    css`
      left: 10px;
      transform: rotate(-180deg) translateY(50%);
    `}

  ${(props) =>
    props.direction === "next" &&
    css`
      right: 10px;
      transform: translateY(-50%);
    `}
`;

export const SingleViewer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;
