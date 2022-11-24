import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  padding: 30px 100px;

  div {
    width: 100px;
  }

  & > :first-child {
    font-weight: 600;
    margin-bottom: 15px;
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
