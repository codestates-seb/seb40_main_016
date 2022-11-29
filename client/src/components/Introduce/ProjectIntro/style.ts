import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 60px 0;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
`;

export const Intro = styled.p`
  margin-bottom: 70px;
  font-size: 14px;
  line-height: 18px;
`;

export const Section = styled.section`
  display: flex;
  margin-bottom: 40px;

  &.ratio7-3 {
    flex-direction: column;

    @media screen and (min-width: 736px) {
      flex-direction: row;
    }

    > div:first-child {
      width: 100%;
      @media screen and (min-width: 736px) {
        width: 70%;
      }
    }
    > div:nth-child(2) {
      width: 100%;
      @media screen and (min-width: 736px) {
        width: 30%;
      }
    }
  }

  &.ratio3-7 {
    flex-direction: column-reverse;

    @media screen and (min-width: 736px) {
      flex-direction: row;
    }

    > div:first-child {
      width: 100%;
      @media screen and (min-width: 736px) {
        width: 30%;
      }
    }
    > div:nth-child(2) {
      width: 100%;
      @media screen and (min-width: 736px) {
        width: 70%;
      }
    }
  }
`;

export const Desc = styled.div`
  h3 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-orange);
  }

  p {
    line-height: 22px;
  }
`;

export const Photo = styled.div`
  img {
    aspect-ratio: 1;
    object-fit: contain;
    width: 100%;
  }
`;
