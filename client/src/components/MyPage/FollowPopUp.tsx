import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Avatar from "../Avatar/Avatar";
import NoContent from "../NoContent/NoContent";

import { GetFollowList } from "../../api/subscribe";

import { ReactComponent as CloseBtn } from "../../assets/img/close-icon.svg";

const FollowModal = styled.div`
  position: absolute;
  left: calc(45% - 20px);
  display: block;
  z-index: 3;
  width: 200px;
  height: 250px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 736px) {
    left: 30%;
  }

  @media screen and (max-width: 396px) {
    left: 25%;
  }
`;

const FollowModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid var(--color-light-black);
  padding: 10px;
  font-size: var(--fs-pc-small);

  > svg {
    position: absolute;
    right: 15px;
    top: 10px;
    width: 10px;
    cursor: pointer;

    &:hover {
      circle,
      path {
        fill: var(--color-light-black);
      }
    }
  }
`;

const FollowerContainer = styled.div`
  height: 200px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FollowBox = styled.div`
  margin: 10px 0px;
`;

const Follow = styled.div`
  padding: 0px 20px;
  font-size: var(--fs-pc-small);
  display: flex;
  align-items: center;
`;

const FollowImg = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const FollowName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const NoFollowContainer = styled.div`
  padding: 20px 0px 30px;
  min-height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  span {
    margin-top: 20px;
    font-weight: 700;
    font-size: var(--fs-pc-small);
    color: var(--color-light-black);
  }

  img {
    width: 100px;
  }
`;

interface Prop {
  setIsOn: (arg: boolean) => void;
  userId: number;
}

interface FollowListProps {
  followedImg: null | string;
  followedId: number;
  followedName: string;
}

const FollowPopUp = ({ setIsOn, userId }: Prop) => {
  const [followList, setFollowList] = useState<FollowListProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetFollowList(userId).then((res: any) => {
      setFollowList(res.data);
    });
  }, []);

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
      <FollowModal>
        <FollowModalHeader>
          <span>팔로우 목록</span>
          <CloseBtn onClick={() => setIsOn(false)} />
        </FollowModalHeader>
        {followList.length === 0 ? (
          <NoFollowContainer>
            <NoContent />
            <span>내가 팔로우한 사람이 없습니다.</span>
          </NoFollowContainer>
        ) : (
          <FollowerContainer>
            {followList.map((follow: FollowListProps) => (
              <FollowBox key={follow.followedId}>
                <Follow
                  onClick={() => {
                    navigate(`/profiles/${follow.followedId}`);
                    window.location.reload();
                  }}
                >
                  <FollowImg>
                    <Avatar className="follow-avatar" bgUrl={follow.followedImg} width="40px" height="40px" />
                  </FollowImg>
                  <FollowName>
                    <span>{follow.followedName}</span>
                  </FollowName>
                </Follow>
              </FollowBox>
            ))}
          </FollowerContainer>
        )}
      </FollowModal>
      <Backdrop onClick={() => setIsOn(false)} />
    </>
  );
};

export default FollowPopUp;
