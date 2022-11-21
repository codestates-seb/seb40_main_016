import styled, { css } from "styled-components";

interface DirectionProp {
  barPosition: "top" | "bottom";
}

export const Wrapper = styled.div<DirectionProp>`
  display: flex;
  justify-content: center;
  gap: 20px;

  ${(props) =>
    props.barPosition === "top" &&
    css`
      border-top: 1px solid var(--color-black);
    `}

  ${(props) =>
    props.barPosition === "bottom" &&
    css`
      border-bottom: 1px solid var(--color-black);
    `}
`;

export const Radio = styled.input<DirectionProp>`
  display: none;

  &:checked + label::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    background-color: var(--color-black);
    width: 100%;
    height: 4px;

    ${(props) =>
      props.barPosition === "top" &&
      css`
        top: 0;
      `}

    ${(props) =>
      props.barPosition === "bottom" &&
      css`
        bottom: 0;
      `}
  }
`;

export const TabBtn = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  cursor: pointer;
`;
