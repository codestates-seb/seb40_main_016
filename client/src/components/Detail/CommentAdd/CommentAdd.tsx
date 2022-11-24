import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import useAutosizeTextArea from "../../../utills/useAutosizeTextArea";
import Button from "../../Button/Button";
import { PostComments, GetComments } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";

import { Wrapper, Icon } from "./style";

import { ReactComponent as ChatIcon } from "../../../assets/img/chat-icon.svg";
import { CommentType } from "../../../types/comment";

interface Prop {
  className?: string;
  articleId: number;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

const CommentAdd = ({ className = "", articleId, setComments }: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target?.value);
  };

  const onSubmit = () => {
    PostComments(articleId, `${value}`, token)
      .then((res) => {
        if (res.status === 201) {
          GetComments(articleId, 1, token)
            .then((res) => {
              setComments(res.data.data);
              setValue("");
            })
            .catch((e) => {
              alert("댓글 불러오기에 실패했습니다.😿");
            });
        }
      })
      .catch((e) => alert("댓글 등록에 실패했습니다.😿"));
  };

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <Wrapper className={className}>
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
