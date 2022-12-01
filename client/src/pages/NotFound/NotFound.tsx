import OuterContainer from "../../components/OuterContainer/OuterConainer";
import { Wrapper, Notice, Title, Desc } from "./style";

const NotFound = () => {
  return (
    <>
      <Wrapper>
        <OuterContainer className="bg">
          <Notice>
            <Title>404</Title>
            <Desc>페이지를 찾을 수 없습니다.</Desc>
          </Notice>
        </OuterContainer>
      </Wrapper>
    </>
  );
};

export default NotFound;
