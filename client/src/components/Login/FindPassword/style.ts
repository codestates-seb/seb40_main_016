import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  padding: 30px 16px;

  > div {
    width: 100%;
  }
`;

export const Notice = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 10px;

  color: var(--color-sky);
  background-color: var(--color-faded-sky);
  word-wrap: break-word;
  word-break: keep-all;
  line-height: 22px;
`;

export const Done = styled.div`
  text-align: center;
  line-height: 25px;
`;
