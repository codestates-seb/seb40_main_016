import { useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as CloseBtn } from "../../assets/img/close-icon.svg";

const SnackCheckModal = styled.div`
  position: fixed;
  top: calc(40%);
  left: calc(45% - 30px);
  display: block;
  z-index: 3;
  width: 200px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.4);

  .close-btn {
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

  @media screen and (max-width: 736px) {
    left: 30%;
  }

  @media screen and (max-width: 415px) {
    left: 25%;
  }
`;

const SnackContainer = styled.div`
  height: 200px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SnackCheckBox = styled.div`
  margin: 10px 0px;
`;

const SnackCheck = styled.div`
  padding: 0px 20px;
  font-size: var(--fs-pc-small);
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    margin-top: 15px;
    width: 100px;
  }

  p {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
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

interface Props {
  setIsOn: (arg: boolean) => void;
}

const SnackPopUp = ({ setIsOn }: Props) => {
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
      <SnackCheckModal>
        <CloseBtn className="close-btn" onClick={() => setIsOn(false)} />
        <SnackContainer>
          <SnackCheckBox>
            <SnackCheck>
              <img src="../assets/dog-with-snack-clipart.png" alt="dog-with-snack" />
              <p>상품이 곧 도착할거다멍!</p>
              <p>기다려봐멍 🐾</p>
            </SnackCheck>
          </SnackCheckBox>
        </SnackContainer>
      </SnackCheckModal>
      <Backdrop onClick={() => setIsOn(false)} />
    </>
  );
};

export default SnackPopUp;
