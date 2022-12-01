import InnerContainer from "../InnerContainer/InnerContainer";
import { Wrapper } from "./style";

interface Prop {
  className: string;
  onClick: () => void;
}

const Banner = ({ className, onClick }: Prop) => {
  return (
    <>
      <Wrapper className={className} onClick={onClick}>
        <InnerContainer className="inner-wrapper">
          <img src="./assets/banner-clipart.png" alt="" />
        </InnerContainer>
      </Wrapper>
    </>
  );
};

export default Banner;
