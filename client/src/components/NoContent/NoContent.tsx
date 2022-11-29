import styled from "styled-components";

const NoContentContainer = styled.div`
  width: 100%;
`;

const NoContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoContent = () => {
  return (
    <NoContentContainer>
      <NoContentBox>
        <img src="./assets/no-comments-clipart.png" alt="no-content" />
      </NoContentBox>
    </NoContentContainer>
  );
};

export default NoContent;
