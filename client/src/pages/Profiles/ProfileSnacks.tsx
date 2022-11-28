import { useEffect, useState } from "react";
import styled from "styled-components";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";

import { GetUserSnacks } from "../../api/mypage";

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

interface Props {
  profileUserId: number;
}

interface SnackList {
  createdAt: string;
  orderId: number;
  orderItems: SnackInfo;
  userId?: number;
  walletId?: number;
  handleChangeDate?: (arg: string) => void;
}

interface SnackInfo {
  [key: string]: any;
  itemId?: number;
  orderPrice?: number;
  quantity?: number;
}

const ProfileSnacks = ({ profileUserId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [snackList, setSnackList] = useState<SnackList[]>([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetUserSnacks(profileUserId).then((res: any) => {
      setSnackList(res.data.data);
    });
  }, []);

  const handleChangeDate = (date: string) => {
    const changeDate = new Date(date);

    const year = changeDate.getFullYear();
    const month = changeDate.getMonth() + 1;
    const day = changeDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <InnerContainer>
      <SnackContainer>
        <SnackTitle>간식 교환 내역</SnackTitle>
        {snackList &&
          snackList.map((snack: SnackList) => (
            <SnackBox key={snack.orderId}>
              <SnackImgBox>
                <SnackImg>
                  <ImageCard
                    imgUrl="https://user-images.githubusercontent.com/104997140/203379733-89a71f76-c1f1-4752-9c23-5bbadc0bc1a5.jpeg"
                    onClick={handleOpen}
                  />
                </SnackImg>
              </SnackImgBox>
              <ChangeList>
                <SnackName>now 그레인프리 어덜트 스몰브리드 2.72kg</SnackName>
                <ChangeInfo>
                  <Quantity>{`수량: ${snack.orderItems[0].quantity}개`}</Quantity>
                  <Price>{`가격: ${snack.orderItems[0].orderPrice}알`}</Price>
                  <ChangeDate>{`교환 날짜: ${handleChangeDate(snack.createdAt)}`}</ChangeDate>
                </ChangeInfo>
              </ChangeList>
            </SnackBox>
          ))}
      </SnackContainer>
    </InnerContainer>
  );
};

export default ProfileSnacks;
