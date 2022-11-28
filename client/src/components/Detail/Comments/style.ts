import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: calc(100% - 63px);
`;

export const GroupComment = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  margin: 20px 0;
`;

export const Comment = styled.div`
  display: flex;
  gap: 8px;

  .comment-avatar {
    flex-shrink: 0;
  }
`;

export const Conts = styled.div`
  width: 100%;
  padding-top: 2px;

  font-size: 14px;
  line-height: 19px;
`;

export const GroupConts = styled.div`
  span {
    margin-right: 10px;
    font-weight: bold;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  font-size: var(--fs-pc-small);
  color: var(--color-light-black);

  strong {
    font-weight: bold;
  }

  svg {
    width: 13px;
    cursor: pointer;

    &:hover {
      filter: grayscale(1);
    }

    * {
      fill: var(--color-light-black);
    }
  }
`;

export const AreaBtn = styled.div`
  svg {
    width: 14px;
  }
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
