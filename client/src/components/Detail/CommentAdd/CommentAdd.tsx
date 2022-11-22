import React, { useRef, useState } from "react";
import useAutosizeTextArea from "../../../utills/useAutosizeTextArea";
import Button from "../../Button/Button";

import { Wrapper, Icon } from "./style";

import { ReactComponent as ChatIcon } from "../../../assets/img/chat-icon.svg";

interface Prop {
  className?: string;
}

const CommentAdd = ({ className = "" }: Prop) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target?.value);
  };

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <Wrapper>
        <Icon>
          <ChatIcon></ChatIcon>
        </Icon>
        <textarea ref={textAreaRef} placeholder="댓글..." onChange={onChange} value={value}></textarea>
        <Button
          className="loginBtn"
          onClick={() => {}}
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
