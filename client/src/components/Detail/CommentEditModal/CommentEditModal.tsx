import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import useAutosizeTextArea from "../../../utills/useAutosizeTextArea";
import { GetComments, UpdataComment } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";

import { Wrapper } from "./style";
import { CommentType } from "../../../types/comment";

interface Prop {
  isCommentEditPopupOn: boolean;
  setIsCommentEditPopupOn: Dispatch<SetStateAction<boolean>>;
  commentConts: string;
  articleId: number;
  commentId: number;
  resetComments: () => void;
}

const CommentEditModal = ({
  isCommentEditPopupOn,
  setIsCommentEditPopupOn,
  commentConts,
  articleId,
  commentId,
  resetComments,
}: Prop) => {
  const token = useRecoilValue(accessTokenState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    UpdataComment(commentId, value, token)
      .then((res) => {
        alert("댓글 수정이 완료되었습니다.😆");
        setIsCommentEditPopupOn(false);
        document.querySelector("#scroll-area").scrollTo(0, 0);

        resetComments();
      })
      .catch((e) => alert("댓글 수정에 실패했습니다.😿"));
  };

  useEffect(() => {
    setValue(commentConts);
  }, [commentConts]);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <Modal
        className="comment-edit-modal"
        title="댓글 수정하기"
        maxWidth="400px"
        bg={true}
        isOn={isCommentEditPopupOn}
        setIsOn={setIsCommentEditPopupOn}
      >
        <Wrapper>
          <textarea ref={textAreaRef} onChange={onChange} value={value}></textarea>
          <Button
            className="loginBtn"
            onClick={onSubmit}
            width="70px"
            height="40px"
            btnColor="yellow"
            btnHoverColor="orange"
            fontSize="pc-small"
          >
            완료
          </Button>
        </Wrapper>
      </Modal>
    </>
  );
};

export default CommentEditModal;
