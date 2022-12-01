import React, { useState, Dispatch, SetStateAction } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Button from "../../../Button/Button";
import mainListState from "../../../../_state/mainLIstState";

import { PostSnack } from "../../../../api/article";

import accessTokenState from "../../../../_state/accessTokenState";
import isLoginState from "../../../../_state/isLoginState";

import { Wrapper, Contents, BtnGroup, Btn, GroupForm } from "./style";
import { Articles } from "../../../../types/article";

interface Prop {
  className?: string;
  articleId?: number;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  setCurrentSnack: Dispatch<SetStateAction<number>>;
}

const SnackGiver = ({ className = "", articleId, setIsOn, setCurrentSnack }: Prop) => {
  const setMainList = useSetRecoilState<Articles[]>(mainListState);
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);
  const [value, setValue] = useState<number>(0);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 100000) {
      setValue(Number(e.target.value));
    } else {
      setValue(100000);
    }
  };

  const updateSnack = (value: number) => {
    setCurrentSnack((prev) => prev + value);
    setMainList((prev) =>
      prev.map((article) => {
        if (article.articleId === articleId) article.yummyCnt += value;
        return article;
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      PostSnack(value, articleId, token)
        .then((res) => {
          alert("성공적으로 간식을 전달하였습니다.😻");
          setIsOn(false);
          updateSnack(value);
        })
        .catch((err) => {
          alert("간식 주기에 실패하였습니다.😿");
        });
      setValue(0);
    }
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
              onClick={() => {
                onSubmit;
              }}
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
