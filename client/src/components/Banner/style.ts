import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: var(--header-height);
  z-index: 1;

  width: 100%;
  height: 45px;

  cursor: pointer;
  background-color: var(--color-faded-sky);
  transform: translateY(-100%);
  transition: 0.2s;

  &:hover {
    background-color: var(--color-medium-sky);
  }

  &.active {
    transform: translateY(0);
  }

  .inner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    padding: 0;

    img {
      width: 100%;
      max-width: 350px;
    }
  }
`;
