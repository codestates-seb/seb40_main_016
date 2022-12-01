import styled from "styled-components";

export const Wrapper = styled.div`
  .bg {
    position: relative;
    height: 100vh;
    background-image: url("./assets/not-found-bg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;

export const Notice = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  color: var(--color-white);
`;

export const Title = styled.p`
  font-size: 200px;
  font-weight: lighter;
`;

export const Desc = styled.p`
  font-size: 30px;
`;
