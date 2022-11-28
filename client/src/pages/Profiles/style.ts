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

  @media screen and (max-width: 736px) {
    font-size: var(--fs-pc-large);
  }
`;

export const UserBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FollowBtn = styled.div`
  margin-right: 20px;
  padding: 0px 35px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid var(--color-green);
  background-color: var(--color-green);
  color: var(--color-white);
  font-size: var(--fs-pc-small);
  cursor: pointer;

  &.follow {
    background-color: var(--color-white);
    color: var(--color-green);
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
