import OuterContainer from "../../components/OuterContainer/OuterConainer";
import ServiceIntro from "../../components/Introduce/ServiceIntro/ServiceIntro";
import TopButton from "../../components/TopButton/TopButton";

import { Wrapper } from "./style";

const Introduce = () => {
  return (
    <>
      <Wrapper>
        <OuterContainer>
          <ServiceIntro />
          <TopButton />
        </OuterContainer>
      </Wrapper>
    </>
  );
};

export default Introduce;
