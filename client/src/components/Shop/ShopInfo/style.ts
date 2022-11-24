import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 100%;
  background-color: var(--color-faded-sky);
  padding: 30px 50px;
  border-radius: 20px;

  p {
    color: var(--color-sky);
    font-size: var(--fs-pc-large);
    font-weight: 700;
    margin-bottom: 20px;
  }

  ul {
    list-style: inside;

    li {
      margin-bottom: 10px;
    }
  }
`;
