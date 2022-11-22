import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;

  .swiper {
    height: 100%;

    .swiper-slide {
      position: relative;
      svg,
      img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      svg {
        height: 12%;
        top: 20%;
      }
      img {
        width: 65%;
        bottom: 0;
      }
    }

    .swiper-pagination-bullet-active {
      color: #fff;
      background: var(--color-orange);
    }
  }
`;
