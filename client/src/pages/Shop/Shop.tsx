import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import accessTokenState from "../../_state/accessTokenState";
import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ShopInfo from "../../components/Shop/ShopInfo/ShopInfo";
import Items from "../../components/Shop/Items/items";
import Calculator from "../../components/Shop/Calculator/Calculator";
import Button from "../../components/Button/Button";
import { Wrapper, ShopWrapper, ButtonWrapper } from "./style";
import { GetItems, OrderItems } from "../../api/shop";
import { ItemProps, OrderItemsProps } from "../../types/shop";

const Shop = () => {
  const token = useRecoilValue(accessTokenState);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [yummy, setYummy] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<OrderItemsProps[]>([]);

  useEffect(() => {
    GetItems(token).then((res) => {
      setItems(() => [...res.items]);
      setYummy(() => res.wallet.yummy);
    });
  }, []);

  const orderItems = () => {
    OrderItems(selectedItems, token).then(() => {
      alert("교환 성공!");
    });
  };

  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer>
          <ShopWrapper>
            <ShopInfo />
            <Items items={items} setTotalCost={setTotalCost} setSelectedItems={setSelectedItems} />
            <Calculator yummy={yummy} totalCost={totalCost} />
            <ButtonWrapper>
              <Button
                className="submitBtn"
                width="220px"
                height="50px"
                btnColor={yummy - totalCost < 0 ? "orange" : "sky"}
                textColor="white"
                btnHoverColor={yummy - totalCost < 0 ? "red" : "blue"}
                fontSize="pc-large"
                onClick={orderItems}
                disabled={yummy - totalCost < 0 ? true : false}
              >
                교환
              </Button>
            </ButtonWrapper>
          </ShopWrapper>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default Shop;
