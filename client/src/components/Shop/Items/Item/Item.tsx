import { useState } from "react";

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

  return (
    <Wrapper>
      <ItemWrapper>
        <ImageCard imgUrl={itemImg} className="itemImg" />
        <ItemInfo isChecked={isChecked} stock={stock}>
          <p>{itemName}</p>
          <Price>
            <span>가격 : {price}알</span>
            <input
              type="number"
              defaultValue={stock > 0 ? 1 : 0}
              max={stock}
              min={0}
              onChange={(e) => setQuantity(() => +e.target.value)}
              disabled={isChecked ? true : false}
            />
          </Price>
        </ItemInfo>
      </ItemWrapper>
      <Checkbox isChecked={isChecked} onClickCheck={onClickCheck} />
    </Wrapper>
  );
};

export default Item;
