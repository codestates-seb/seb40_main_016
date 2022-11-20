import styled, { css } from "styled-components";

interface DirectionProp {
  barPosition: "top" | "bottom";
}

export const Wrapper = styled.div<DirectionProp>`
  display: flex;
  justify-content: center;
  gap: 10px;

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
    top: 0;
    left: 0;
    background-color: var(--color-black);
    width: 100%;

    ${(props) =>
      props.barPosition === "top" &&
      css`
        border-top: 4px solid var(--color-black);
      `}

    ${(props) =>
      props.barPosition === "bottom" &&
      css`
        border-bottom: 4px solid var(--color-black);
      `}
  }
`;

export const TabBtn = styled.label`
  position: relative;
  display: inline-block;
  padding: 10px 10px 6px 10px;
  height: 100%;
  cursor: pointer;
`;
