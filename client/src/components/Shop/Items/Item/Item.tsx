import React, { useState } from "react";

import ImageCard from "../../../ImageCard/ImageCard";
import Checkbox from "../../../Checkbox/Checkbox";

import { Wrapper, ItemWrapper, ItemInfo, Price } from "./style";
import { ItemProps } from "../../../../types/shop";

const Item = ({ itemId, itemImg, itemName, price, stock, setTotalCost, setSelectedItems }: ItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const onClickCheck = () => {
    setIsChecked((isChecked) => !isChecked);

    if (isChecked) {
      setTotalCost((cost) => cost - price * quantity);
      setSelectedItems((items) => items.filter((item) => item.itemId !== itemId));
    } else {
      setTotalCost((cost) => cost + price * quantity);
      setSelectedItems((items) => [...items, { itemId: itemId, quantity: quantity }]);
    }
  };

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    let number = +e.target.value;

    if (number > stock) {
      e.target.value = `${stock}`;
      setQuantity(() => stock);
    } else if (number < 1) {
      e.target.value = `1`;
      setQuantity(() => 1);
    } else {
      setQuantity(() => +e.target.value);
    }
  };

  return (
    <Wrapper>
      <ImageCard imgUrl={itemImg} className="itemImg" />
      <ItemWrapper>
        <ItemInfo isChecked={isChecked} stock={stock}>
          <p>{itemName}</p>
          <Price>
            <span>가격 : {price}알</span>
            <input
              type="number"
              defaultValue={stock > 0 ? 1 : 0}
              max={stock}
              min={1}
              onChange={changeQuantity}
              disabled={isChecked || stock <= 0 ? true : false}
            />
          </Price>
        </ItemInfo>
      </ItemWrapper>
      {stock > 0 ? (
        <Checkbox isChecked={isChecked} onClickCheck={onClickCheck} />
      ) : (
        <p className="soldOut">품절 되었습니다.</p>
      )}
    </Wrapper>
  );
};

export default Item;
