import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 16px 16px 0 16px;
  box-sizing: border-box;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .avatar {
    flex-shrink: 0;
    cursor: pointer;
  }
`;

export const AuthorName = styled.p`
  width: 100%;
  display: inline-block;
  font-size: var(--fs-pc-large);
  font-weight: bold;
  cursor: pointer;
`;

export const TimeStamp = styled.small`
  justify-self: flex-end;
  white-space: nowrap;
  font-size: var(--fs-pc-small);
  color: var(--color-gray);
`;

export const Conts = styled.pre`
  margin: 16px 0 6px;
  line-height: 20px;
`;
