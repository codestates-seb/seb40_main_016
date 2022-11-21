import { Dispatch, SetStateAction } from "react";

import Button from "../../components/Button/Button";
import styled from "styled-components";

import { ReactComponent as PersonIcon } from "../../assets/img/person-icon.svg";
import { ReactComponent as CatIcon } from "../../assets/img/cat-icon.svg";
import { ReactComponent as DogIcon } from "../../assets/img/dog-icon.svg";

import { SignupUserInfo } from "../../types/user";

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

interface Prop {
  userInfo: SignupUserInfo;
  setUserInfo: Dispatch<SetStateAction<SignupUserInfo>>;
}

const StepType = ({ userInfo, setUserInfo }: Prop) => {
  return (
    <>
      <Wrapper>
        <Button
          className={userInfo.userType === "PERSON" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "PERSON" });
          }}
          width="100%"
          height="60px"
          btnColor="ivory"
          btnHoverColor="dark-ivory"
          textColor="black"
          fontSize="pc-regular"
          isShadow={true}
        >
          <PersonIcon />
        </Button>
        <Button
          className={userInfo.userType === "CAT" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "CAT" });
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
          className={userInfo.userType === "DOG" ? "type-btn active" : "type-btn"}
          onClick={() => {
            setUserInfo({ ...userInfo, userType: "DOG" });
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
