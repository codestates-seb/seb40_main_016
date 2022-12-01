import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import { DeleteArticle } from "../../../api/article";

import accessTokenState from "../../../_state/accessTokenState";

import { Wrapper, Desc, BtnGroup } from "./style";

interface Prop {
  isCofirmDeletePopupOn: boolean;
  setIsCofirmDeletePopupOn: Dispatch<SetStateAction<boolean>>;
  contsId: number;
}

const ConfirmDeleteModal = ({ isCofirmDeletePopupOn, setIsCofirmDeletePopupOn, contsId }: Prop) => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenState);

  const onCancel = () => {
    setIsCofirmDeletePopupOn(false);
  };

  const onDelete = () => {
    DeleteArticle(contsId, token)
      .then((res) => {
        if (res.status === 204) {
          navigate(0);
        }
      })
      .catch((err) => alert("글 삭제에 실패하였습니다.😿"));
  };

  return (
    <>
      <Modal maxWidth="300px" bg={true} isOn={isCofirmDeletePopupOn} setIsOn={setIsCofirmDeletePopupOn}>
        <Wrapper>
          <Desc>정말로 삭제하시겠습니까?</Desc>
          <BtnGroup>
            <Button
              className="loginBtn"
              onClick={onCancel}
              width="100%"
              height="50px"
              btnColor="ivory"
              btnHoverColor="dark-ivory"
              fontSize="pc-regular"
            >
              취소
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
          </BtnGroup>
        </Wrapper>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
