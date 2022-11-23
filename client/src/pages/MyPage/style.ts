import styled from "styled-components";

export const MyAccountPage = styled.div`
  min-height: 100vh; //추후 스타일 적용 후 삭제 필요
`;

export const ProfileContainer = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileInfo = styled.div`
  width: 70%;
`;

export const UserInfo = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserName = styled.span`
  width: 30%;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: var(--fs-pc-xlarge);
`;

export const UserBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;

    &:first-child {
      width: 100px;
      border: 1px solid var(--color-gray);
      border-radius: 30px;
    }
  }

  div {
    margin-right: 20px;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-gray);
    border-radius: 30px;

    svg {
      margin-right: 10px;
      width: 20px;
    }

    span {
      font-size: var(--fs-pc-small);
    }
  }

  svg {
    width: 25px;
  }
`;

export const UserDesc = styled.div`
  div {
    margin-top: 20px;
    font-size: var(--fs-pc-small);

    span {
      margin-right: 20px;
    }
  }
  p {
    margin-top: 20px;
    font-size: var(--fs-pc-regular);
  }
`;
