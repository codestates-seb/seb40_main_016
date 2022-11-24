import styled from "styled-components";

export const Wrapper = styled.li`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 736px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const ItemWrapper = styled.div`
  width: 100%;

  @media screen and (max-width: 736px) {
    display: flex;
  }

  .itemImg {
    @media screen and (max-width: 736px) {
      max-width: 30%;
    }
  }

  img {
    border-radius: 30px;
  }
`;

export const ItemInfo = styled.div`
  margin-top: 20px;
  margin-left: 10px;

  p {
    font-weight: 600;
  }

  @media screen and (max-width: 736px) {
    width: 70%;
    margin-left: 30px;
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  input[type="number"] {
    max-width: 50px;
    border-style: none;

    &::-webkit-inner-spin-button {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }
  }

  @media screen and (max-width: 736px) {
    flex-direction: column;

    input[type="number"] {
      margin-top: 15px;
    }
  }
`;
