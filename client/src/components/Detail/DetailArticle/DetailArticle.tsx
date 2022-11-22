import { Dispatch, SetStateAction, useState, useEffect } from "react";

import Avatar from "../../Avatar/Avatar";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";
import { GetUserInfo } from "../../../api/api";

import { Wrapper, Info, AuthorName, TimeStamp, Conts } from "./style";

interface Prop {
  userId: number;
  createdAt?: string;
  content?: string;
  setAuthorType?: Dispatch<SetStateAction<"PERSON" | "CAT" | "DOG">>;
  setAuthorNickname: Dispatch<SetStateAction<string>>;
}

const DetailArticle = ({
  userId,
  createdAt = "2022-11-21T06:28:48.918Z",
  content,
  setAuthorType = () => {},
  setAuthorNickname,
}: Prop) => {
  const [userName, setUserName] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    GetUserInfo(userId)
      .then((res) => {
        setUserName(res.data.data.userName);
        setAuthorNickname(res.data.data.userName);
        setAuthorType(res.data.data.userType);
        setAvatarUrl(res.data.data.userImg);
      })
      .catch((e) => alert("유저 정보를 불러오는 데에 실패했습니다😿"));
  }, [userId]);

  useEffect(() => {
    DisplayCreatedAt("");
  }, []);

  return (
    <>
      <Wrapper>
        <Info>
          <Avatar className="avatar" width="40px" height="40px" bgUrl={avatarUrl} />
          <AuthorName>{userName}</AuthorName>
          <TimeStamp>{DisplayCreatedAt(createdAt)}</TimeStamp>
        </Info>
        <Conts>{content}</Conts>
      </Wrapper>
    </>
  );
};

export default DetailArticle;
