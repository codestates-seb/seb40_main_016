import styled, { css } from "styled-components";

export const CheckboxWrapper = styled.div`
  position: relative;
  margin-left: 10px;
`;

export const Label = styled.label<{ isChecked: boolean }>`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  top: 0;

  ${({ isChecked }) => {
    return isChecked
      ? css`
          background-color: var(--color-sky);
          border-color: var(--color-sky);

          &:after {
            border: 2px solid var(--color-white);
            border-top: none;
            border-right: none;
            content: "";
            height: 6px;
            left: 7px;
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        `
      : css`
          background-color: var(--color-white) !important;

          &:after {
            opacity: 1;
          }
        `;
  }}
`;
