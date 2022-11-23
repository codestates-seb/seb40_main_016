import styled from "styled-components";

export const InnerWrapper = styled.div`
  display: flex;
  height: 800px;

  @media screen and (max-width: 736px) {
    padding: 20px;
  }
`;

export const SelectedPhoto = styled.div`
  position: relative;
  width: 50%;

  div:first-child {
    height: 100%;
  }

  @media screen and (max-width: 736px) {
    width: 30%;
    height: 25%;

    img {
      border-radius: 20px;
    }

    .swiper-pagination {
      display: none;
    }
  }
`;

export const ArticleWrapper = styled.div`
  width: 50%;
  height: 100%;

  @media screen and (max-width: 736px) {
    width: 70%;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;

  @media screen and (max-width: 736px) {
    margin: 2px 0 15px 10px;
  }
`;

export const Nickname = styled.p`
  font-size: var(--fs-pc-large);
  font-weight: 500;
  margin-left: 10px;
`;

export const Textarea = styled.textarea`
  width: 93%;
  height: 75%;
  resize: none;
  border-style: none;
  padding-left: 20px;
  font-size: var(--fs-pc-regular);

  &:focus {
    outline: none;
  }
`;
