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

interface RadioGroupProp {
  height?: string;
}

export const RadioGroup = styled.div<RadioGroupProp>`
  height: ${(props) => props.height};
  display: flex;
  gap: 10px;
`;

export const RadioInput = styled.input`
  display: none;
  border: 1px solid orange;

  &:checked + label {
    color: var(--color-white);
    path {
      fill: var(--color-white);
    }
  }

  &:checked + .boy {
    background-color: var(--color-green);
    border-color: var(--color-green);
  }
  &:checked + .girl {
    background-color: var(--color-orange);
    border-color: var(--color-orange);
  }
`;

export const RadioBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  transition: 0.2s;

  cursor: pointer;
  border-style: none;
  border-radius: 15px;
  background-color: var(--color-ivory);
  border: 1px solid var(--color-dark-gray);

  &:hover {
    background-color: var(--color-dark-ivory);
  }

  svg {
    margin-right: 5px;
    path {
      transition: 0.2s;
    }
  }

  &.girl {
    svg {
      height: 48%;
    }
  }

  &.boy {
    svg {
      height: 40%;
    }
  }
`;
