import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import { ReactComponent as EmptyPhoto } from "../../assets/img/empty-photo-icon.svg";
import { ReactComponent as AddPhoto } from "../../assets/img/add-photo-icon.svg";
import {
  Wrapper,
  PhotoWrapper,
  PhotoChoiceWrapper,
  PhotoListWrapper,
  InnerWrapper,
  ArticleWrapper,
  Photo,
  Profile,
  Nickname,
  Textarea,
} from "./style";

function NewArticle() {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [isPhoto, setIsPhoto] = useState<boolean>(false);

  const popupHandler = () => {
    setIsPopup(!isPopup);
  };

  return (
    <Wrapper>
      <Modal
        title="새 게시물 만들기"
        maxWidth={isPhoto ? "680px" : "1200px"}
        titleBtn={isPhoto ? "next" : "done"}
        bg={true}
        isOn={isPopup}
        setIsOn={setIsPopup}
        onTitleBtnClick={() => alert("다음으로!")}
      >
        {isPhoto ? (
          <PhotoWrapper>
            <PhotoChoiceWrapper>
              <EmptyPhoto className="emptyPhoto" />
              <p>사진을 여기에 끌어다 놓으세요</p>
              <Button btnColor="orange" btnHoverColor="red" textColor="white" onClick={() => alert("임시!")}>
                컴퓨터에서 선택
              </Button>
            </PhotoChoiceWrapper>
            <AddPhoto className="addPhoto" />
            {/* addPhoto 버튼 누를 시 나오는 창 */}
            <PhotoListWrapper></PhotoListWrapper>
          </PhotoWrapper>
        ) : (
          <InnerWrapper>
            <Photo src="https://i.pinimg.com/236x/15/36/e7/1536e7de67f8f992c595a308ec8ae363.jpg" alt="photo" />
            <ArticleWrapper>
              <Profile>
                <Avatar width="50px" height="50px" />
                <Nickname>잭슨</Nickname>
              </Profile>
              <Textarea placeholder="글 입력"></Textarea>
            </ArticleWrapper>
          </InnerWrapper>
        )}
      </Modal>
      <button onClick={popupHandler}>팝업</button>
    </Wrapper>
  );
}

export default NewArticle;
