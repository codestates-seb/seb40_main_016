import exp from "constants";
import styled, { css } from "styled-components";

export const Wrapper = styled.div``;

export const PhotoWrapper = styled.div`
  text-align: end;

  .addPhoto {
    width: 70px;
    fill-opacity: 0.5;
    margin: 20px;
    cursor: pointer;
  }
`;

export const PhotoChoiceWrapper = styled.div`
  /* background-color: tomato; */
  text-align: center;
  padding: 220px 0;

  p {
    font-size: var(--fs-pc-large);
    color: var(--color-light-black);
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .emptyPhoto {
    width: 172px;
  }
`;

export const PhotoListWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 400px;
`;

export const InnerWrapper = styled.div`
  display: flex;
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

export const ArticleWrapper = styled.div`
  width: 100%;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

export const Nickname = styled.p`
  font-size: var(--fs-pc-large);
  font-weight: 500;
  margin-left: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border-style: none;
  padding-left: 20px;
  font-size: var(--fs-pc-regular);

  &:focus {
    outline: none;
  }
`;
