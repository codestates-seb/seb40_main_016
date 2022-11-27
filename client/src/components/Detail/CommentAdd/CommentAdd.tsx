import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import useAutosizeTextArea from "../../../utills/useAutosizeTextArea";
import Button from "../../Button/Button";
import { PostComments, GetComments } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import isLoginState from "../../../_state/isLoginState";

import { Wrapper, Icon } from "./style";

import { ReactComponent as ChatIcon } from "../../../assets/img/chat-icon.svg";
import { CommentType } from "../../../types/comment";

interface Prop {
  className?: string;
  articleId: number;
  resetComments: () => void;
}

const CommentAdd = ({ className = "", articleId, resetComments }: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target?.value);
  };

  const onSubmit = () => {
    if (isLogin) {
      PostComments(articleId, `${value}`, token)
        .then((res) => {
          if (res.status === 201) {
            document.querySelector("#scroll-area").scrollTo(0, 0);
            resetComments();
            setValue("");
          }
        })
        .catch((e) => alert("댓글 등록에 실패했습니다.😿"));
    } else {
      alert("로그인이 필요합니다.😆");
      setValue("");
    }
  };

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <Wrapper id="base-point" className={className}>
        <Icon>
          <ChatIcon></ChatIcon>
        </Icon>
        <textarea ref={textAreaRef} placeholder="댓글..." onChange={onChange} value={value}></textarea>
        <Button
          className="loginBtn"
          onClick={onSubmit}
          width="50px"
          height="30px"
          btnColor="white"
          btnHoverColor="orange"
          textColor="orange"
          fontSize="pc-small"
        >
          게시
        </Button>
      </Wrapper>
    </>
  );
};

export default CommentAdd;
