import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const LogoutMessage = styled.div`
  .modal {
    width: 350px;

    @media screen and (max-width: 736px) {
      width: 250px;
    }
  }
`;

const ContentBox = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .button {
    @media screen and (max-width: 736px) {
      width: 40%;
      font-size: var(--fs-pc-small);
    }
  }
`;

const Content = styled.p`
  margin-bottom: 30px;
  font-size: var(--fs-pc-large);

  @media screen and (max-width: 736px) {
    font-size: var(--fs-pc-regular);
  }
`;

interface Prop {
  isOn: boolean;
  setIsOn: (arg: boolean) => void;
}

const LogoutPopup = ({ isOn, setIsOn }: Prop) => {
  const navigate = useNavigate();

  return (
    <LogoutMessage>
      <Modal className="modal" isOn={isOn} setIsOn={setIsOn}>
        <ContentBox>
          <Content>로그아웃 되었습니다.</Content>
          <Button
            className="button"
            onClick={() => {
              setIsOn(false);
              navigate(0);
            }}
          >
            확인
          </Button>
        </ContentBox>
      </Modal>
    </LogoutMessage>
  );
};

export default LogoutPopup;
