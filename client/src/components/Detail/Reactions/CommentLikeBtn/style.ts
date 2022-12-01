import styled from "styled-components";

interface ButtonProp {
  active: boolean;
}

export const Button = styled.button<ButtonProp>`
  background-color: unset;
  border: none;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }
`;
