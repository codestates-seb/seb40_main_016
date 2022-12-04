import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 60px 0;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
`;

export const Intro = styled.p`
  margin-bottom: 70px;
  line-height: 30px;
`;

export const Desc = styled.section`
  margin-bottom: 40px;

  h3 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-orange);
  }

  ul {
    list-style: square;
    margin: 0 20px;
  }

  li {
    padding: 10px 0;
  }

  img {
    max-width: 100%;
    width: 800px;
    margin-bottom: 10px;
  }
`;
