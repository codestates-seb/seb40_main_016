import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  display: none;
  position: absolute;
  bottom: -48px;
  left: -20px;
  background-color: var(--color-white);
  border-radius: 20px;
  box-shadow: 0px 3px 10px var(--color-gray);
  white-space: nowrap;
  font-size: var(--fs-pc-small);

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: calc(50% - 10px);
    display: inline-block;
    transform: rotate(-45deg);
    width: 10px;
    height: 10px;
    background-color: var(--color-white);
  }

  &.active {
    display: block;
  }
`;

const Contents = styled.div`
  position: relative;
  z-index: 2;
`;

interface Props {
  className?: string;
  children?: string;
}

const Ballon = ({ className, children }: Props) => {
  return (
    <Wrapper className={className}>
      <Contents>{children}</Contents>
    </Wrapper>
  );
};

export default Ballon;
