import { Dispatch, SetStateAction } from "react";
import Button from "../../components/Button/Button";
import styled from "styled-components";
import { ReactComponent as HumanIcon } from "../../assets/img/human-icon.svg";
import { ReactComponent as CatIcon } from "../../assets/img/cat-icon.svg";
import { ReactComponent as DogIcon } from "../../assets/img/dog-icon.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 40px 0;
  .type-btn {
    transition: 0.2s;
    &:active {
      margin-left: unset;
      margin-top: unset;
    }
    svg {
      width: 35px;
    }
    &.active {
      background-color: var(--color-green);
    }
  }
`;

interface UserInfo {
  [index: string]: string;
  userName: string;
  email: string;
  password: string;
  content: string;
  userType: "human" | "cat" | "dog" | "";
  userBirth: string;
  userGender: string;
}

interface Prop {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

const StepType = ({ userInfo, setUserInfo }: Prop) => {
  return (
    <>
      <Wrapper>
        <Button
          className={userInfo.userType === "human" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "human" });
          }}
          width="100%"
          height="60px"
          btnColor="ivory"
          btnHoverColor="dark-ivory"
          textColor="black"
          fontSize="pc-regular"
          isShadow={true}
        >
          <HumanIcon />
        </Button>
        <Button
          className={userInfo.userType === "cat" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "cat" });
          }}
          width="100%"
          height="60px"
          btnColor="ivory"
          btnHoverColor="dark-ivory"
          textColor="black"
          fontSize="pc-regular"
          isShadow={true}
        >
          <CatIcon />
        </Button>
        <Button
          className={userInfo.userType === "dog" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "dog" });
          }}
          width="100%"
          height="60px"
          btnColor="ivory"
          btnHoverColor="dark-ivory"
          textColor="black"
          fontSize="pc-regular"
          isShadow={true}
        >
          <DogIcon />
        </Button>
      </Wrapper>
    </>
  );
};

export default StepType;
