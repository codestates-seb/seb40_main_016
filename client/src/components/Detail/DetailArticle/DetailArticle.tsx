import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../../Avatar/Avatar";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";
import { GetUserInfo } from "../../../api/user";

import { Wrapper, Info, AuthorName, TimeStamp, Conts } from "./style";
interface Prop {
  userId: number | null;
  createdAt?: string;
  content?: string;
  setAuthorType?: Dispatch<SetStateAction<"PERSON" | "CAT" | "DOG">>;
  setAuthorNickname: Dispatch<SetStateAction<string>>;
  detailHandler: () => void;
  myId: number;
}

const DetailArticle = ({
  userId,
  createdAt = "2022-11-21T06:28:48.918Z",
  content,
  setAuthorType = () => {},
  setAuthorNickname,
  detailHandler,
  myId,
}: Prop) => {
  const [userName, setUserName] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      GetUserInfo(userId)
        .then((res) => {
          setUserName(res.data.data.userName);
          setAuthorNickname(res.data.data.userName);
          setAuthorType(res.data.data.userType);
          setAvatarUrl(res.data.data.userImg);
        })
        .catch((e) => alert("유저 정보를 불러오는 데에 실패했습니다😿"));
    }
  }, [userId]);

  useEffect(() => {
    DisplayCreatedAt("");
  }, []);

  const handleOnProfilePage = () => {
    if (userId === myId) {
      navigate("/mypage");
    } else {
      navigate(`/profiles/${userId}`);
    }
    detailHandler();
  };

  return (
    <>
      <Wrapper>
        <Info>
          <Avatar className="avatar" width="40px" height="40px" bgUrl={avatarUrl} />
          <AuthorName onClick={handleOnProfilePage}>{userName}</AuthorName>
          <TimeStamp>{DisplayCreatedAt(createdAt)}</TimeStamp>
        </Info>
        <Conts>{content}</Conts>
      </Wrapper>
    </>
  );
};

export default DetailArticle;
