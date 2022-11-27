import styled from "styled-components";

export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;

  @media screen and (max-width: 736px) {
    flex-direction: column;
  }
`;

export const AvatarWrapper = styled.div`
  margin-right: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 736px) {
    margin-right: 0;
    margin-bottom: 30px;
  }

  img {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 150px;
    object-fit: cover;

    @media screen and (max-width: 736px) {
      width: 150px;
      height: 150px;
    }
  }

  label {
    color: var(--color-sky);
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  padding: 40px 0;

  @media screen and (max-width: 736px) {
    display: flex;
    justify-content: center;
    width: 90%;
    padding-bottom: 0;
  }

  button {
    @media screen and (max-width: 736px) {
      width: 100%;
    }

    &:first-child {
      margin-right: 20px;
    }
  }
`;
