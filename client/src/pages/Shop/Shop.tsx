import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import accessTokenState from "../../_state/accessTokenState";
import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ShopInfo from "../../components/Shop/ShopInfo/ShopInfo";
import Items from "../../components/Shop/Items/items";
import Calculator from "../../components/Shop/Calculator/Calculator";
import Button from "../../components/Button/Button";
import { GetItems, OrderItems } from "../../api/shop";

import { ReactComponent as MansaeCat } from "../../assets/img/mansae-cat.svg";

import { Wrapper, ShopWrapper, CatPopUpWrapper, CatPopUp, Triangle, ButtonWrapper } from "./style";
import { ItemProps, OrderItemsProps } from "../../types/shop";

const Shop = () => {
  const token = useRecoilValue(accessTokenState);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [yummy, setYummy] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<OrderItemsProps[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    GetItems(token).then((res) => {
      setItems(() => [...res.items]);
      setYummy(() => res.wallet.yummy);
    });
  }, []);

  const orderItems = () => {
    if (selectedItems.length <= 0) {
      alert("선택한 물품이 없습니다!");
      return;
    }

    OrderItems(selectedItems, token).then(() => {
      alert("교환 성공!");

      GetItems(token).then((res) => {
        setItems(() => [...res.items]);
        setYummy(() => res.wallet.yummy);
        setTotalCost(() => 0);
        setSelectedItems(() => []);
        setIsSubmit(() => true);
      });
    });
  };
  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer>
          <ShopWrapper>
            <ShopInfo />
            <Items items={items} isSubmit={isSubmit} setTotalCost={setTotalCost} setSelectedItems={setSelectedItems} />
            <Calculator yummy={yummy} totalCost={totalCost} />
            <CatPopUpWrapper isHover={isHover}>
              <CatPopUp>
                <MansaeCat />
              </CatPopUp>
              <Triangle />
            </CatPopUpWrapper>
            <ButtonWrapper onMouseOver={() => setIsHover(() => true)} onMouseLeave={() => setIsHover(() => false)}>
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
