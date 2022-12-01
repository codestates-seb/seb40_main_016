import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
`;

export const GroupSocialBtn = styled.div`
  display: flex;
  justify-content: center;
`;

export const SocialBtn = styled.p<{ sort: "google" | "naver" | "github" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-right: 10px;

  border-radius: 15px;
  background-color: var(--color-ivory);
  cursor: pointer;

  &:hover {
    background-color: var(--color-dark-ivory);
  }

  > svg {
    height: 35px;
  }
`;
