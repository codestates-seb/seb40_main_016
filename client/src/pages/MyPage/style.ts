import styled from "styled-components";

export const MyAccountPage = styled.div``;

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

  .profile-avatar {
    @media screen and (max-width: 736px) {
      width: 110px;
      height: 110px;
    }
  }
`;

export const ProfileInfo = styled.div`
  width: 70%;
`;

export const UserInfo = styled.div`
  width: 70%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const UserName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: var(--fs-pc-xlarge);

  @media screen and (max-width: 736px) {
    font-size: var(--fs-pc-large);
  }
`;

export const UserBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 736px) {
    margin: 3px 0px;
  }
`;

export const YummyBtn = styled.div`
  margin-right: 20px;
  padding: 0px 20px;
  height: 40px;
  max-width: 160px;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-pc-small);
  border: 1px solid var(--color-gray);
  border-radius: 30px;
  white-space: nowrap;

  svg {
    margin-right: 10px;
    width: 20px;
  }

  @media screen and (max-width: 736px) {
    font-size: var(--fs-pc-xsmall);
    padding: 0px 10px;
    height: 30px;

    svg {
      margin-right: 5px;
      width: 13px;
    }
  }
`;

export const SettingWalletBtn = styled.div`
  margin-right: 10px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: none;
  background-color: transparent;
  font-size: var(--fs-pc-small);
  cursor: pointer;

  svg {
    width: 25px;

    @media screen and (max-width: 736px) {
      width: 20px;
    }
  }
`;

export const UserDesc = styled.div`
  div {
    margin-top: 20px;
    font-size: var(--fs-pc-small);

    button {
      padding: 0px;
      margin-right: 30px;
      border: none;
      background-color: transparent;

      &:not(:first-child) {
        cursor: pointer;
      }
    }

    @media screen and (max-width: 736px) {
      font-size: 12px;
    }
  }

  p {
    margin-top: 30px;
    font-size: var(--fs-pc-regular);

    @media screen and (max-width: 736px) {
      margin-top: 10px;
      font-size: var(--fs-pc-small);
    }
  }
`;
