import { useEffect, useState } from "react";
import styled from "styled-components";

const TopButtonContainer = styled.div`
  position: fixed;
  right: 4%;
  bottom: 7%;
  z-index: 1;

  @media screen and (max-width: 736px) {
    right: 6%;
    bottom: 3%;
  }
`;

const Top = styled.button`
  width: 60px;
  height: 60px;
  background-color: white;
  box-shadow: 0px 2px 10px 0px var(--color-gray);
  border: none;
  border-radius: 40px;

  &:hover {
    background-color: var(--color-ivory);
    cursor: pointer;
  }

  @media screen and (max-width: 736px) {
    width: 45px;
    height: 45px;
  }
`;

const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButtonContainer>
      <Top onClick={scrollToTop} type="button">
        Top
      </Top>
    </TopButtonContainer>
  );
};

export default TopButton;
