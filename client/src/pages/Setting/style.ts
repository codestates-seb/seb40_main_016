import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  background-color: var(--color-ivory);
`;

export const SettingWrapper = styled.div`
  max-width: 1000px;
  height: 700px;
  background-color: var(--color-white);
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 20px;

  @media screen and (max-width: 736px) {
    height: 800px;
    margin: 50px 0;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 95%;
  }
`;
