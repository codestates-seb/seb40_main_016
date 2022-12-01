import styled from "styled-components";

export const SocialPage = styled.div`
  min-height: 100vh;
  background-color: var(--color-ivory);

  .no-header {
    padding-top: unset;
  }

  .conts-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: calc(100vh - var(--header-height));
  }
`;

export const Conts = styled.main`
  width: 100%;
  max-width: 504px;
  margin: 0 auto;
`;

export const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 16px 16px 30px 16px;
  min-height: 300px;
  border-radius: 20px;

  background-color: var(--color-white);
  box-shadow: 0px 5px 10px -3px var(--color-light-black);

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -37%);
    width: 161px;
    height: 161px;
    border-radius: 50%;
    background-color: var(--color-white);
  }

  .done-btn {
    display: block;
    margin: 30px auto 0 auto;

    &:active {
      margin: 30px auto 0 auto;
    }
  }
`;

export const Header = styled.header`
  position: relative;
  text-align: center;
  margin-top: -60px;

  > svg {
    width: 40px;
  }
`;

export const StepNum = styled.div`
  margin: 10px 0;
  color: var(--color-orange);
  font-size: 14px;
  font-weight: bolder;
`;

export const StepDesc = styled.div`
  margin-bottom: 40px;
  font-size: 18px;
  line-height: 22px;
`;
