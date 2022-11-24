import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import { DeleteArticle, PostArticleReport } from "../../../api/article";
import { GetComments, DeleteComment, PostCommentReport } from "../../../api/comment";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../_state/accessTokenState";

import { Wrapper } from "./style";
import { CommentType } from "../../../types/comment";

interface Prop {
  className: string;
  type: "article" | "comment";
  isMy: boolean;
  isOn: boolean;
  contsId: number; //current activated articleId or commentId
  setIsOn: Dispatch<SetStateAction<boolean>>;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  articleId: number; //articleId for refresh comment list
}

const ExtraFeatureModal = ({ className, type, isMy = false, isOn, contsId, setIsOn, setComments, articleId }: Prop) => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);

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
      console.log("글 수정");
    } else if (type === "comment") {
      console.log("댓글 수정");
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

            GetComments(articleId, 1, token)
              .then((res) => {
                setComments(res.data.data);
              })
              .catch((e) => {
                alert("댓글 불러오기에 실패했습니다.😿");
              });
          }
        })
        .catch((err) => alert("댓글 삭제에 실패하였습니다.😿"));
    }
  };

  return (
    <>
      <Modal className={className} maxWidth="300px" isOn={isOn} setIsOn={setIsOn}>
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
