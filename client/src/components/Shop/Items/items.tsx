import styled from "styled-components";

import Item from "./Item/Item";

import { ItemsProps } from "../../../types/shop";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  margin: 100px 0;

  @media screen and (max-width: 736px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Items = ({ items, setTotalCost, setSelectedItems }: ItemsProps) => {
  return (
    <Wrapper>
      {items &&
        items.map((item) => {
          return (
            <Item
              key={item.itemId}
              itemId={item.itemId}
              itemImg={item.itemImg}
              itemName={item.itemName}
              price={item.price}
              stock={item.stock}
              setTotalCost={setTotalCost}
              setSelectedItems={setSelectedItems}
            />
          );
        })}
    </Wrapper>
  );
};

export default Items;
