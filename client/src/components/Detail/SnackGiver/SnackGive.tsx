import React, { useState } from "react";
import Button from "../../Button/Button";
import { Wrapper, Contents, BtnGroup, Btn, GroupForm } from "./style";

interface Prop {
  className?: string;
}

const SnackGiver = ({ className = "" }: Prop) => {
  const [value, setValue] = useState<number>(0);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(0);
  };

  const AddQuantity = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    const addNum = Number(e.target.dataset.q);
    setValue((prevQ) => prevQ + addNum);
  };

  return (
    <>
      <Wrapper className={className}>
        <Contents>
          <BtnGroup>
            <Btn onClick={AddQuantity} data-q={1}>
              +1
            </Btn>
            <Btn onClick={AddQuantity} data-q={5}>
              +5
            </Btn>
            <Btn onClick={AddQuantity} data-q={10}>
              +10
            </Btn>
            <Btn onClick={AddQuantity} data-q={50}>
              +50
            </Btn>
          </BtnGroup>
          <GroupForm onSubmit={onSubmit}>
            <label>
              수량
              <input type="number" value={value} onChange={onInputChange}></input>
            </label>
            <Button
              className="loginBtn"
              onClick={() => {}}
              width="40px"
              height="25px"
              btnColor="white"
              btnHoverColor="faded-sky"
              textColor="sky"
              fontSize="pc-small"
            >
              완료
            </Button>
          </GroupForm>
        </Contents>
      </Wrapper>
    </>
  );
};

export default SnackGiver;
