import styled, { css } from "styled-components";
import { ButtonProps } from "./Button";

export const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  border-style: none;
  border-radius: 15px;

  ${({
    width = "150px",
    height = "40px",
    btnColor = "ivory",
    btnHoverColor = "dark-ivory",
    textColor = "black",
    fontSize = "pc-regular",
    isShadow = false,
  }) => css`
    width: ${width};
    height: ${height};
    background-color: ${`var(--color-${btnColor})`};
    color: ${`var(--color-${textColor})`};
    font-size: ${`var(--fs-${fontSize})`};
    box-shadow: ${isShadow ? "0px 3px 3px var(--color-gray)" : "none"};

    &:hover {
      background-color: ${`var(--color-${btnHoverColor})`};
    }

    &:active {
      margin-left: 1px;
      margin-top: 1px;
      box-shadow: none;
    }
  `}
`;
