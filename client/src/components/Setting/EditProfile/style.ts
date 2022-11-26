import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 100px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
`;

export const AvatarWrapper = styled.div`
  margin-right: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 150px;
    object-fit: cover;
  }

  button {
    background-color: var(--color-white);
    color: var(--color-sky);
    border: none;
    margin-top: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 50px;

  button:first-child {
    margin-right: 20px;
  }
`;
