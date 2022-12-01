import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Avatar from "../Avatar/Avatar";
import NoContent from "../NoContent/NoContent";

import { GetFollowerList } from "../../api/subscribe";

import { ReactComponent as CloseBtn } from "../../assets/img/close-icon.svg";

const FollowerModal = styled.div`
  position: absolute;
  left: 40%;
  z-index: 3;
  width: 200px;
  height: 250px;
  max-height: 85vh;
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

const FollowerModalHeader = styled.div`
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

const FollowerBox = styled.div`
  margin: 10px 0px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Follower = styled.div`
  padding: 0px 20px;
  font-size: var(--fs-pc-small);
  display: flex;
  align-items: center;
`;

const FollowerImg = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const FollowerName = styled.div`
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

const NoFollowerContainer = styled.div`
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

interface FollowerListProps {
  followingImg: null | string;
  followingId: number;
  followingName: string;
}

const FollowerPopUp = ({ setIsOn, userId }: Prop) => {
  const [followerList, setFollowerList] = useState<FollowerListProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetFollowerList(userId).then((res: any) => {
      setFollowerList(res.data);
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
      <FollowerModal>
        <FollowerModalHeader>
          <span>팔로워 목록</span>
          <CloseBtn onClick={() => setIsOn(false)} />
        </FollowerModalHeader>
        {followerList.length === 0 ? (
          <NoFollowerContainer>
            <NoContent />
            <span>나를 팔로우한 사람이 없습니다.</span>
          </NoFollowerContainer>
        ) : (
          <>
            {followerList.map((follower: FollowerListProps) => (
              <FollowerBox key={follower.followingId}>
                <Follower>
                  <FollowerImg onClick={() => navigate(`/profiles/${follower.followingId}`)}>
                    <Avatar className="follow-avatar" bgUrl={follower.followingImg} width="40px" height="40px" />
                  </FollowerImg>
                  <FollowerName onClick={() => navigate(`/profiles/${follower.followingId}`)}>
                    <span>{follower.followingName}</span>
                  </FollowerName>
                </Follower>
              </FollowerBox>
            ))}
          </>
        )}
      </FollowerModal>
      <Backdrop onClick={() => setIsOn(false)} />
    </>
  );
};

export default FollowerPopUp;
