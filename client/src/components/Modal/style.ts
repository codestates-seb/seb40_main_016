import styled from "styled-components";

interface BgProp {
  bg: boolean;
  isOn: boolean;
}

export const Bg = styled.div<BgProp>`
  display: ${(props) => (props.isOn ? "block" : "none")};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;

  background-color: ${(props) => (!props.bg ? "unset" : "rgba(0,0,0,0.7)")};

  > svg {
    position: absolute;
    right: 0;
    padding: 16px;

    width: 30px;
    height: 30px;
    cursor: pointer;

    path {
      fill: #fff;
    }
  }
`;

interface PopupProp {
  maxWidth: string;
}

export const Popup = styled.div<PopupProp>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  min-height: 200px;
  max-height: 90vh;
  overflow: auto;
  width: calc(100% - 16px * 2);
  max-width: ${(props) => props.maxWidth};

  border-radius: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.4);

  @media screen and (min-width: var(--pc-start)) {
    width: 50%;
    height: 50%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface PopupHeaderProp {
  title: string;
}

export const PopupHeader = styled.div<PopupHeaderProp>`
  position: relative;
  display: ${(props) => (props.title ? "block" : "none")};
  box-sizing: border-box;
  border-bottom: 0.5px solid var(--color-light-black);
  padding: 13px 10px;

  text-align: center;
  font-size: 20px;

  > svg {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    padding: 13px 10px;
    cursor: pointer;

    &:hover {
      circle,
      path {
        fill: var(--color-light-black);
      }
    }

    &.orange {
      path {
        fill: var(--color-orange);
      }

      &:hover {
        path {
          filter: brightness(1.5);
        }
      }
    }
  }
`;
