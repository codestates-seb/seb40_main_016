import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";

import { DeleteSubscribe } from "../../api/subscribe";

import userInfoState from "../../_state/userInfoState";
import accessTokenState from "../../_state/accessTokenState";

const UnFollowModal = styled.div`
  position: absolute;
  left: 38%;
  z-index: 3;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 736px) {
    left: 20%;
  }

  @media screen and (max-width: 396px) {
    left: 12%;
  }
`;

const UnFollowBox = styled.div`
  padding: 16px;
  height: 85%;
`;

const UnFollow = styled.div`
  font-size: var(--fs-pc-small);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UnFollowImg = styled.div`
  margin-bottom: 20px;
`;

const UnFollowMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnFollowBtn = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: var(--fs-pc-small);

    &:first-child {
      margin-right: 10px;
      color: var(--color-red);
    }
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface Prop {
  setIsOn: (arg: boolean) => void;
  userName: string;
  userImg: string;
  userId: number;
  setOnFollow: (arg: boolean) => void;
}

const UnFollowPopUp = ({ setIsOn, userName, userImg, userId, setOnFollow }: Prop) => {
  const myInfo = useRecoilValue(userInfoState);
  const token = useRecoilValue(accessTokenState);

  const handleUnFollow = () => {
    DeleteSubscribe(myInfo.userId, userId, token)
      .then((res) => {
        return res;
      })
      .catch((err) => alert("구독 취소에 실패했습니다.😿"));
    setOnFollow(false);
    setIsOn(false);
    window.location.reload();
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <UnFollowModal>
        <UnFollowBox>
          <UnFollow>
            <UnFollowImg>
              <Avatar className="follow-avatar" bgUrl={userImg} width="65px" height="65px" />
            </UnFollowImg>
            <UnFollowMessage>{`${userName}님의 팔로우를 취소하시겠어요?`}</UnFollowMessage>
          </UnFollow>
          <UnFollowBtn>
            <Button onClick={handleUnFollow} width="110px" height="40px">
              확인
            </Button>
            <Button onClick={() => setIsOn(false)} width="110px" height="40px">
              취소
            </Button>
          </UnFollowBtn>
        </UnFollowBox>
      </UnFollowModal>
      <Backdrop onClick={() => setIsOn(false)} />
    </>
  );
};

export default UnFollowPopUp;
