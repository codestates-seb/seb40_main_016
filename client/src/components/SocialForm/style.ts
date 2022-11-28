import styled from "styled-components";

export const GroupForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const GroupRadio = styled.div`
  > p {
    color: var(--color-black);
    margin: 5px 10px;
  }
`;

export const RadioConts = styled.div`
  display: flex;
  gap: 10px;
  height: 50px;

  > input {
    display: none;

    :checked + label {
      background-color: var(--color-green);
      color: var(--color-white);
      border-color: var(--color-green);
    }
  }

  > label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.3%;

    border: 1px solid var(--color-gray);
    color: var(--color-gray);
    border-radius: 15px;
    cursor: pointer;
    transition: 0.2s;
  }
`;
