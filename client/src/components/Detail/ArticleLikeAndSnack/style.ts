import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 16px;
  box-sizing: border-box;

  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray);

  .flex-end {
    justify-self: flex-end;
  }
`;

export const GroupBtn = styled.div`
  flex-shrink: 0;
  display: inline-block;

  > div:nth-child(1) {
    margin-right: 5px;
  }
`;

export const GroupCounter = styled.p`
  width: 100%;
  display: inline-block;
  margin-left: 10px;
`;

export const Counter = styled.span`
  margin-right: 8px;
  font-size: var(--fs-pc-normal);
`;
