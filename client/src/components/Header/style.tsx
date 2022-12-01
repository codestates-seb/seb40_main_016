import styled, { keyframes } from "styled-components";

export const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  background-color: var(--color-white);
  height: var(--header-height);
  box-shadow: 0px 0px 10px -3px var(--color-light-black);
  z-index: 2;

  .inner {
    display: flex;
    align-items: center;
  }
`;

export const LogoBox = styled.div`
  position: relative;

  @media screen and (max-width: 736px) {
    width: 60px;
  }

  @media screen and (max-width: 396px) {
    width: 40px;
  }

  .logo {
    width: 200px;
    height: 80px;

    @media screen and (max-width: 736px) {
      opacity: 0;
    }
  }

  .logo-responsive {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 70px;
    height: 40px;
    opacity: 0;

    @media screen and (max-width: 736px) {
      opacity: 1;
    }

    @media screen and (max-width: 396px) {
      left: 0px;
    }
  }
`;

export const SearchBox = styled.form`
  margin: 0px 40px;
  width: 100%;
  border: 2px solid var(--color-gray);
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  .search-icon {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 25px;
    fill: var(--color-gray);
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  margin-left: 45px;
  height: 35px;
  border: none;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: var(--color-gray);
  }
`;

export const MenuBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;

  .menu-icon {
    display: none;
    position: absolute;
    top: -20px;
    right: 0px;
    cursor: pointer;

    @media screen and (max-width: 736px) {
      display: block;
    }
  }

  .user-img {
    width: 60px;
    margin-right: 10px;
  }
`;

export const LoginBoforeBtn = styled.button`
  margin: 0px 30px 0px 0px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: var(--color-white);
  font-size: var(--fs-pc-small);
  color: var(--color-black);
  border: none;
  flex-shrink: 0;

  @media screen and (max-width: 736px) {
    width: 45px;
    height: 45px;
    font-size: var(--fs-pc-xsmall);
  }

  &:hover {
    background-color: var(--color-ivory);
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s;
  }
`;

export const LoginAfterBtn = styled.button`
  margin: 0px 20px 0px 0px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--color-white);
  border: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  @media screen and (max-width: 736px) {
    display: none;
  }

  .add-icon {
    position: relative;
  }

  .shop-icon {
    position: relative;
  }

  .user-image {
    position: relative;
  }

  .logout-icon {
    position: relative;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s;

    .add-balloon,
    .shop-balloon,
    .user-balloon,
    .logout-balloon {
      display: block;

      &:before {
        left: calc(50% - 5px);
      }
    }

    .add-balloon {
      left: -22px;
    }

    .shop-balloon {
      left: -16px;
    }

    .user-balloon,
    .logout-balloon {
      left: -13px;
    }
  }
`;
