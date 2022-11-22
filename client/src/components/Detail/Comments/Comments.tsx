import Avatar from "../../Avatar/Avatar";
import ReactionBtn from "../ReactionBtn/ReactionBtn";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";

import { GroupComment, Comment, Conts, GroupConts, Footer, AreaBtn } from "./style";

import { dummy } from "./dummy";

const Comments = () => {
  return (
    <>
      {dummy.map((item, idx) => {
        return (
          <GroupComment key={idx}>
            <Comment>
              <Avatar className="comment-avatar" width="22px" height="22px" bgUrl="" />
              <Conts>
                <GroupConts>
                  <span>{item.userName}</span>
                  {item.content}
                </GroupConts>
                <Footer>
                  <span>{DisplayCreatedAt(item.createdAt)}</span>
                  <strong>좋아요 2개</strong>
                </Footer>
              </Conts>
              <AreaBtn>
                <ReactionBtn
                  btnId={`comment-like${item.commentId}`}
                  btnType="like"
                  userType="CAT"
                  defaultStatus={false}
                />
              </AreaBtn>
            </Comment>
          </GroupComment>
        );
      })}
    </>
  );
};

export default Comments;
