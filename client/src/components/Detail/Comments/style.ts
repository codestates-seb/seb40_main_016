import styled from "styled-components";

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
  margin-top: 5px;
  font-size: var(--fs-pc-small);
  color: var(--color-light-black);

  strong {
    margin-left: 10px;
    font-weight: bold;
  }
`;

export const AreaBtn = styled.div`
  padding-top: 4px;
  svg {
    width: 14px;
  }
`;
