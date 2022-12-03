import OuterContainer from "../../components/OuterContainer/OuterConainer";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ProjectIntro from "../../components/Introduce/ProjectIntro/ProjectIntro";
import TopButton from "../../components/TopButton/TopButton";

import { Wrapper } from "./style";

const Introduce = () => {
  return (
    <>
      <Wrapper>
        <OuterContainer>
          <InnerContainer>
            <ProjectIntro />
            <TopButton />
          </InnerContainer>
        </OuterContainer>
      </Wrapper>
    </>
  );
};

export default Introduce;
