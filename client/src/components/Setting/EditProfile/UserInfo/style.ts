import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 30px;
  margin: 40px 0;

  @media screen and (max-width: 736px) {
    width: 100%;
    margin: 0;
  }

  label {
    margin-bottom: 10px;
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  border: 1px solid var(--color-dark-gray);
  background-color: var(--color-white);
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid var(--color-sky);
  }
`;

export const ErrorMsgStyle = styled.p`
  color: var(--color-red);
  margin: 5px 10px;
  font-size: var(--fs-pc-small);
`;
