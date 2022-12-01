import styled from "styled-components";

export const FilterContainer = styled.main`
  padding: 80px 0px 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 736px) {
    padding: 80px 0px 50px;
    flex-direction: column;
  }
`;

export const TabBox = styled.div`
  @media screen and (max-width: 736px) {
    margin-bottom: 20px;
  }
`;

export const SortBox = styled.div`
  width: 190px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
    width: 150px;
  }

  button {
    box-shadow: 0px 2px 5px 0px var(--color-gray);

    &.clicked {
      background-color: var(--color-madium-black);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-madium-black);
      }
    }

    @media screen and (max-width: 736px) {
      width: 70px;
      height: 50px;
      font-size: var(--fs-pc-small);
    }
  }
`;

export const ImgContainer = styled.main`
  padding: 0px 0px 65px 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;

  @media screen and (max-width: 736px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
`;

export const ImgBox = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px var(--color-light-black);

  .img-card {
    max-height: 278px;
  }

  @media screen and (max-width: 736px) {
    border-radius: 0px;
  }
`;

export const Dim = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0c0d0e50;
    cursor: pointer;

    .info {
      opacity: 1;
    }
  }

  @media screen and (max-width: 736px) {
    border-radius: 0px;
  }
`;

export const InfoBox = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 736px) {
    height: 65px;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Info = styled.div`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-white);
  font-size: var(--fs-pc-regular);

  svg {
    margin-right: 5px;
    width: 18px;
  }

  .views {
    width: 20px;
  }
`;

export const NoArticleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;

  span {
    margin-top: 20px;
    font-weight: 700;
    font-size: var(--fs-pc-large);
    color: var(--color-light-black);
  }

  @media screen and (max-width: 736px) {
    span {
      font-size: var(--fs-pc-regular);
    }
    img {
      width: 150px;
    }
  }
`;
