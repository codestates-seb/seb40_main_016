import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import NoContent from "../../components/NoContent/NoContent";

import { GetMySnacks } from "../../api/mypage";

import accessTokenState from "../../_state/accessTokenState";

const SnackContainer = styled.div`
  margin: 50px 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: 736px) {
    margin: 20px 10px 50px;
  }
`;

const SnackTitle = styled.div`
  margin-bottom: 30px;
  font-size: var(--fs-pc-large);

  @media screen and (max-width: 736px) {
    margin-bottom: 15px;
    font-size: var(--fs-pc-regular);
  }
`;

const SnackBox = styled.div`
  margin: 10px 0px;
  width: 100%;
  display: flex;
`;

const SnackImgBox = styled.div`
  margin-right: 40px;
  width: 120px;
  min-width: 120px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 736px) {
    margin-right: 20px;
  }
`;

const SnackImg = styled.div`
  overflow: hidden;
  border-radius: 20px;

  div {
    cursor: auto;
  }
`;

const ChangeList = styled.div`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 736px) {
    padding: 15px 0px;
  }
`;

const SnackName = styled.div`
  margin-bottom: 40px;

  @media screen and (max-width: 736px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const ChangeInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 736px) {
    flex-direction: column;
  }
`;

const Quantity = styled.div`
  font-size: var(--fs-pc-small);

  @media screen and (max-width: 736px) {
    font-size: 13px;
    margin: 3px 0px;
  }
`;

const Price = styled.div`
  font-size: var(--fs-pc-small);

  @media screen and (max-width: 736px) {
    font-size: 13px;
    margin: 3px 0px;
  }
`;

const ChangeDate = styled.div`
  font-size: var(--fs-pc-small);

  @media screen and (max-width: 736px) {
    font-size: 13px;
    margin: 3px 0px;
  }
`;
const NoChangeSnackContainer = styled.div`
  padding: 0px 0px 30px;
  min-height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  span {
    margin-top: 20px;
    font-weight: 700;
    font-size: var(--fs-pc-regular);
    color: var(--color-light-black);
  }

  img {
    width: 150px;
  }
`;

interface SnackList {
  createdAt: string;
  orderId: number;
  orderItems: SnackInfo[];
  userId?: number;
  walletId?: number;
  handleChangeDate?: (arg: string) => void;
}
interface SnackInfo {
  itemId: number;
  itemImg: string;
  itemName: string;
  orderPrice: number;
  quantity: number;
}

const MyPageSnacks = () => {
  const token = useRecoilValue(accessTokenState);
  const [mySnackList, setMySnackList] = useState<SnackList[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetMySnacks(token).then((res: any) => {
      setMySnackList(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleChangeDate = (date: string) => {
    const changeDate = new Date(date);

    const year = changeDate.getFullYear();
    const month = changeDate.getMonth() + 1;
    const day = changeDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <InnerContainer>
      <SnackContainer>
        <SnackTitle>간식 교환 내역</SnackTitle>
        {mySnackList.length === 0 && !loading ? (
          <NoChangeSnackContainer>
            <NoContent />
            <span>아직 교환한 간식이 없습니다.</span>
          </NoChangeSnackContainer>
        ) : (
          <>
            {mySnackList.map((snack: SnackList) =>
              snack.orderItems.map((item: any) => (
                <SnackBox key={`${item.orderId} - ${item.orderPrice}`}>
                  <SnackImgBox>
                    <SnackImg>
                      <ImageCard imgUrl={item.itemImg} onClick={handleOpen} />
                    </SnackImg>
                  </SnackImgBox>
                  <ChangeList>
                    <SnackName>{item.itemName}</SnackName>
                    <ChangeInfo>
                      <Quantity>{`수량: ${item.quantity}개`}</Quantity>
                      <Price>{`가격: ${item.orderPrice}알`}</Price>
                      <ChangeDate>{`교환 날짜: ${handleChangeDate(snack.createdAt)}`}</ChangeDate>
                    </ChangeInfo>
                  </ChangeList>
                </SnackBox>
              )),
            )}
          </>
        )}
      </SnackContainer>
    </InnerContainer>
  );
};

export default MyPageSnacks;
