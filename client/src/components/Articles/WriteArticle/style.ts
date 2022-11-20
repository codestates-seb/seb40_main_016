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

  .prev,
  .next {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    opacity: 0.8;
    margin: 0 10px;
    cursor: pointer;
  }

  .prev {
    transform: rotate(180deg);
  }

  .next {
    right: 0;
  }

  @media screen and (max-width: 736px) {
    width: 30%;
    height: 25%;

    .prev,
    .next {
      display: none;
    }
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media screen and (max-width: 736px) {
    border-radius: 20px;
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
  width: 95%;
  height: 75%;
  border-style: none;
  padding-left: 20px;
  font-size: var(--fs-pc-regular);

  &:focus {
    outline: none;
  }
`;
