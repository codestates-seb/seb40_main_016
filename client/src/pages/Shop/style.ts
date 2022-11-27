import styled, { css } from "styled-components";

export const Wrapper = styled.div``;

export const ShopWrapper = styled.div`
  margin-top: 100px;
`;

export const CatPopUpWrapper = styled.div<{ isHover: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;

  ${({ isHover }) => css`
    opacity: ${isHover ? 1 : 0};
  `}
`;

export const CatPopUp = styled.div`
  width: 220px;
  background-color: var(--color-ivory);
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;

  svg {
    height: 45px;
  }
`;

export const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-bottom: 20px solid var(--color-ivory);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  transform: rotate(180deg);
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 120px;
`;
