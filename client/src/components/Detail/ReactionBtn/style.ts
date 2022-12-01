import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const HiddenInput = styled.input`
  display: none;

  &:checked + label {
    p:nth-child(1) {
      display: none;
    }
    p:nth-child(2) {
      display: inline-block;
      opacity: 1;
    }
  }
`;

export const Btn = styled.label`
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
`;

export const Icon = styled.p`
  display: none;

  opacity: 0.5;

  &:nth-of-type(1) {
    display: inline-block;
  }

  svg {
    width: 17px;
    height: 17px;
  }

  .sub {
    svg {
      height: 17px;
    }
  }
`;
