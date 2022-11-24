import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 70px;
`;

export const CalcTitle = styled.div<{ diff: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 30px;
  border-radius: 20px 0 0 20px;

  ${({ diff }) => css`
    background-color: ${diff < 0 ? "var(--color-orange)" : "var(--color-sky)"};
  `}

  span {
    font-weight: 700;
    color: var(--color-white);
    margin-left: 10px;
  }

  svg {
    max-width: 30px;
  }

  @media screen and (max-width: 736px) {
    padding: 20px;
    font-size: var(--fs-pc-small);
  }
`;

export const CalcMain = styled.div<{ diff: number }>`
  display: flex;
  width: 80%;

  ${({ diff }) => css`
    background-color: ${diff < 0 ? "var(--color-faded-orange)" : "var(--color-faded-sky)"};

    path {
      fill: ${diff < 0 ? "var(--color-orange)" : "var(--color-sky)"};
    }
  `}

  svg {
    max-width: 5%;
  }

  &:last-child {
    border-radius: 0 20px 20px 0;
  }
`;
