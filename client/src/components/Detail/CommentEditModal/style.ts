import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  min-height: 120px;

  textarea {
    width: 100%;
    min-height: 25px;
    padding: 4px 4px 4px;

    border: 1px solid var(--color-gray);
    outline: none;
    border-radius: 5px;

    font-size: 16px;

    &:focus {
      outline: none;
      border: 1px solid var(--color-sky);
    }
  }
`;
