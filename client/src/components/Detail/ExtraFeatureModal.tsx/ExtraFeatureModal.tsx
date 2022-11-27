import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import { DeleteArticle, PostArticleReport } from "../../../api/article";
import { GetComments, DeleteComment, PostCommentReport } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";
import isLoginState from "../../../_state/isLoginState";

import { Wrapper } from "./style";
import { CommentType } from "../../../types/comment";

interface Prop {
  className: string;
  type: "article" | "comment";
  isMy: boolean;
  isOn: boolean;
  contsId: number; //current activated articleId or commentId
  setIsOn: Dispatch<SetStateAction<boolean>>;
  resetComments: () => void;
  articleId: number; //articleId for refresh comment list;
  editPopupHandler: () => void;
  detailHandler: () => void;
  commentEditPopupHandler: () => void;
}

const ExtraFeatureModal = ({
  className,
  type,
  isMy = false,
  isOn,
  contsId,
  setIsOn,
  resetComments,
  articleId,
  editPopupHandler,
  detailHandler,
  commentEditPopupHandler,
}: Prop) => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);

  const onReport = () => {
    if (type === "article") {
      PostArticleReport(contsId, "신고", token)
        .then((res) => {
          if (res.status === 200) {
            alert("신고 접수되었습니다.😺");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("이미 신고한 글입니다.😿");
          } else {
            alert("글 신고에 실패하였습니다.😿");
          }
        });
    } else if (type === "comment") {
      PostCommentReport(contsId, "신고", token)
        .then((res) => {
          if (res.status === 200) {
            alert("신고 접수되었습니다.😺");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("이미 신고한 댓글입니다.😿");
          } else {
            alert("댓글 신고에 실패하였습니다.😿");
          }
        });
    }
  };

  const onEdit = () => {
    if (type === "article") {
      setIsOn(false);
      detailHandler();
      editPopupHandler();
    } else if (type === "comment") {
      commentEditPopupHandler();
    }
  };

  const onDelete = () => {
    if (type === "article") {
      DeleteArticle(contsId, token)
        .then((res) => {
          if (res.status === 204) {
            navigate(0);
          }
        })
        .catch((err) => alert("글 삭제에 실패하였습니다.😿"));
    } else if (type === "comment") {
      DeleteComment(contsId, token)
        .then((res) => {
          if (res.status === 204) {
            setIsOn(false);
            document.querySelector("#scroll-area").scrollTo(0, 0);
            resetComments();
          }
        })
        .catch((err) => alert("댓글 삭제에 실패하였습니다.😿"));
    }
  };

  return (
    <>
      <Modal className={className} maxWidth="300px" bg={true} isOn={isOn} setIsOn={setIsOn}>
        <Wrapper>
          {isMy ? (
            <>
              <Button
                className="loginBtn"
                onClick={onEdit}
                width="100%"
                height="50px"
                btnColor="ivory"
                btnHoverColor="dark-ivory"
                textColor="black"
                fontSize="pc-regular"
              >
                수정
              </Button>
              <Button
                className="loginBtn"
                onClick={onDelete}
                width="100%"
                height="50px"
                btnColor="ivory"
                btnHoverColor="dark-ivory"
                textColor="red"
                fontSize="pc-regular"
              >
                삭제
              </Button>
            </>
          ) : null}

          <Button
            className="loginBtn"
            onClick={onReport}
            width="100%"
            height="50px"
            btnColor="ivory"
            btnHoverColor="dark-ivory"
            textColor="red"
            fontSize="pc-regular"
            disabled={!isLogin}
          >
            신고
          </Button>
          <Button
            className="loginBtn"
            onClick={() => {
              setIsOn(false);
            }}
            width="100%"
            height="50px"
            btnColor="ivory"
            btnHoverColor="dark-ivory"
            textColor="black"
            fontSize="pc-regular"
          >
            취소
          </Button>
        </Wrapper>
      </Modal>
    </>
  );
};

export default ExtraFeatureModal;
