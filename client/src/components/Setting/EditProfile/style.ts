import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  padding: 0 100px;

  box-sizing: border-box;
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

  label {
    color: var(--color-sky);
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 40px 0;

  button:first-child {
    margin-right: 20px;
  }
`;
