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
`;

export const FollowBtn = styled.div`
  margin-right: 20px;
  padding: 0px 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid var(--color-green);
  background-color: var(--color-green);
  cursor: pointer;

  svg {
    width: 25px;
    filter: invert(100%) sepia(86%) saturate(3%) hue-rotate(176deg) brightness(105%) contrast(100%);
  }

  &.follow {
    background-color: var(--color-white);
    border: 1px solid var(--color-gray);
    svg {
      filter: invert(0%) sepia(4%) saturate(0%) hue-rotate(309deg) brightness(100%) contrast(107%);
    }
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

  svg {
    margin-right: 10px;
    width: 20px;
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
    margin-top: 30px;
    font-size: var(--fs-pc-regular);
  }
`;
