import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  right: 0;

  display: flex;
  gap: 6px;

  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray);

  button {
    flex-shrink: 0;
    &:hover {
      color: var(--color-white);
    }
  }

  textarea {
    height: 25px;
    min-height: 25px;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;
  }
`;

export const Icon = styled.div`
  flex-shrink: 0;
  width: 25px;
  height: 25px;
`;
