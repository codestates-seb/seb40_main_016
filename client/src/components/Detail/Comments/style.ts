import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: calc(100% - 63px);
`;

export const NoComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  img {
    width: 100px;
    opacity: 0.6;
  }

  small {
    font-size: var(--fs-pc-small);
    color: var(--color-light-black);
    line-height: 17px;
  }
`;

export const EndPoint = styled.div`
  height: 50px;
`;
