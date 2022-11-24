import styled from "styled-components";

export const Wrapper = styled.li`
  .itemImg img {
    background-color: tomato;
    border-radius: 30px;
  }

  & > div:last-child {
    text-align: end;
  }
`;

export const ItemInfo = styled.div`
  margin-top: 20px;
  margin-left: 10px;

  p {
    font-weight: 600;
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;

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
`;
