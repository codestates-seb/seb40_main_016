import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  padding: 30px;
  width: 100%;

  & > :first-child {
    font-weight: 600;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 736px) {
    padding: 20px;
    font-size: var(--fs-pc-small);
  }
`;

interface CalcContentProps {
  title: string;
  content: string | number;
}

const CalcContent = ({ title, content }: CalcContentProps) => {
  return (
    <Wrapper>
      <div>{title}</div>
      <div>{content}알</div>
    </Wrapper>
  );
};

export default CalcContent;
