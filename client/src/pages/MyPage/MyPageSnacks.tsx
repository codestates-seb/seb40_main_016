import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";
import NoContent from "../../components/NoContent/NoContent";
import Loading from "../../components/Loading/Loading";

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

  .snack-img {
    cursor: default;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const obsRef = useRef(null);

  const getMySnackList = (page: number, token: string) => {
    setLoading(true);

    GetMySnacks(page, token).then((res: any) => {
      if (res.data.pageInfo.page === 1) {
        setMySnackList(res.data.data);
        setPage(2);
      } else {
        setMySnackList(mySnackList.concat(res.data.data));
        setPage((prev) => prev + 1);
      }
      setTotalPage(res.data.pageInfo.totalPages);
      setLoading(false);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page <= totalPage) {
        getMySnackList(page, token);
      }
    });

    if (obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, totalPage, token]);

  const handleChangeDate = (date: string) => {
    const changeDate = new Date(date);

    const year = changeDate.getFullYear();
    const month = changeDate.getMonth() + 1;
    const day = changeDate.getDate();

    return `${year}??? ${month}??? ${day}???`;
  };

  return (
    <InnerContainer>
      <SnackContainer>
        <SnackTitle>?????? ?????? ??????</SnackTitle>
        {mySnackList && mySnackList.length === 0 && !loading ? (
          <NoChangeSnackContainer>
            <NoContent />
            <span>?????? ????????? ????????? ????????????.</span>
          </NoChangeSnackContainer>
        ) : (
          <>
            {mySnackList &&
              mySnackList.map((snack: SnackList) =>
                snack.orderItems.map((item: any) => (
                  <SnackBox key={`${item.orderId} - ${item.orderPrice}`}>
                    <SnackImgBox>
                      <SnackImg>
                        <ImageCard className="snack-img" imgUrl={item.itemImg} onClick={() => {}} />
                      </SnackImg>
                    </SnackImgBox>
                    <ChangeList>
                      <SnackName>{item.itemName}</SnackName>
                      <ChangeInfo>
                        <Quantity>{`??????: ${item.quantity}???`}</Quantity>
                        <Price>{`??????: ${item.orderPrice}???`}</Price>
                        <ChangeDate>{`?????? ??????: ${handleChangeDate(snack.createdAt)}`}</ChangeDate>
                      </ChangeInfo>
                    </ChangeList>
                  </SnackBox>
                )),
              )}
            {loading ? <Loading /> : null}
          </>
        )}
        <div ref={obsRef} />
      </SnackContainer>
    </InnerContainer>
  );
};

export default MyPageSnacks;
