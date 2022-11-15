import styled from "styled-components";

interface WrapperProp {
  bgUrl?: string;
  width: string;
  height: string;
}

export const Wrapper = styled.div<WrapperProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => (props.bgUrl ? `url(${props.bgUrl})` : "url('./default-avatar-bg.png')")};
`;
