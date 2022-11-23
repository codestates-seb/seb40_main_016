import { useState } from "react";
import styled from "styled-components";

import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ImageCard from "../../components/ImageCard/ImageCard";

const SnackContainer = styled.div`
  margin: 50px 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SnackTitle = styled.div`
  margin-bottom: 30px;
  font-size: var(--fs-pc-large);
`;

const SnackBox = styled.div`
  display: flex;
`;

const SnackImg = styled.div`
  margin-right: 40px;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 20px;
`;

const ChangeList = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const SnackName = styled.div`
  margin-bottom: 40px;
`;

const ChangeInfo = styled.div`
  display: flex;
`;

const Quantity = styled.div`
  margin-right: 100px;
  font-size: var(--fs-pc-small);
`;

const Price = styled.div`
  margin-right: 100px;
  font-size: var(--fs-pc-small);
`;

const ChangeDate = styled.div`
  font-size: var(--fs-pc-small);
`;

const MyPageSnacks = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <InnerContainer>
      <SnackContainer>
        <SnackTitle>간식 교환 내역</SnackTitle>
        <SnackBox>
          <SnackImg>
            <ImageCard
              imgUrl="https://user-images.githubusercontent.com/104997140/203379733-89a71f76-c1f1-4752-9c23-5bbadc0bc1a5.jpeg"
              onClick={handleOpen}
            />
          </SnackImg>
          <ChangeList>
            <SnackName>now 그레인프리 어덜트 스몰브리드 2.72kg</SnackName>
            <ChangeInfo>
              <Quantity>수량: 1개</Quantity>
              <Price>가격: 400알</Price>
              <ChangeDate>교환 날짜: 2022년 11월 26일</ChangeDate>
            </ChangeInfo>
          </ChangeList>
        </SnackBox>
      </SnackContainer>
    </InnerContainer>
  );
};

export default MyPageSnacks;
