import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelStyle = styled.label<{ fontSize?: string }>`
  color: var(--color-black);
  margin: 5px 10px;

  ${({ fontSize = "pc-regular" }) => css`
    font-size: ${`var(--fs-${fontSize})`};
  `};
`;

export const ErrorMsgStyle = styled.p`
  color: var(--color-red);
  margin: 5px 10px;
  font-size: var(--fs-pc-small);
`;

export const InputStyle = styled.input<{ height?: string; inputColor?: string; fontSize?: string }>`
  width: 100%;
  padding: 0 15px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid var(--color-dark-gray);

  ${({ height = "50px", inputColor = "white", fontSize = "pc-regular" }) => css`
    height: ${height};
    background-color: ${`var(--color-${inputColor})`};
    font-size: ${`var(--fs-${fontSize})`};

    &:focus {
      outline: none;
      border: 1px solid var(--color-sky);
    }
  `}
`;
