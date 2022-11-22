import styled from "styled-components";

export const Wrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: -10px;
  width: 200px;
  transform: translateY(105%);

  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 10px;
  box-shadow: 0px 3px 3px var(--color-gray);

  font-size: var(--fs-pc-small);

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 15px;
    display: inline-block;
    transform: rotate(-45deg);
    width: 10px;
    height: 10px;

    background-color: var(--color-white);
    border-top: 1px solid var(--color-gray);
    border-right: 1px solid var(--color-gray);
  }

  &.active {
    display: block;
  }
`;

export const Contents = styled.div`
  position: relative;
  z-index: 2;
`;

export const BtnGroup = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-gray);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

export const Btn = styled.div`
  width: 25%;
  border-right: 1px solid var(--color-gray);
  text-align: center;
  padding: 12px 0 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-faded-sky);
  }

  &:nth-of-type(4) {
    border-right: unset;
  }
`;

export const GroupForm = styled.form`
  display: flex;
  align-items: center;
  padding: 10px 5px;

  label {
    white-space: nowrap;
    color: var(--color-gray);
  }

  input {
    width: 75%;
    height: 25px;
    margin-left: 5px;

    border: 1px solid var(--color-gray);
    outline: none;
    border-radius: 5px;

    &:focus {
      outline: none;
      border: 1px solid var(--color-sky);
    }
  }

  button {
    flex-shrink: 0;
  }
`;
