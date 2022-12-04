import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Avatar from "../../Avatar/Avatar";
import DisplayCreatedAt from "../../../utills/DisplayCreatedAt";
import { GetUserInfo } from "../../../api/user";

import userInfoState from "../../../_state/userInfoState";

import { Wrapper, Info, AuthorName, TimeStamp, Conts } from "./style";
import { DetailData } from "../../../types/article";
import { UserInfo } from "../../../types/user";

interface Prop {
  articleData: DetailData;
  setAuthorType?: Dispatch<SetStateAction<"PERSON" | "CAT" | "DOG">>;
  setModalName: Dispatch<SetStateAction<string>>;
  detailHandler: () => void;
}

const DetailArticle = ({ articleData, setAuthorType = () => {}, setModalName, detailHandler }: Prop) => {
  const myInfo = useRecoilValue(userInfoState);
  const myId = myInfo.userId;
  const [authorInfo, setAuthorInfo] = useState<UserInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleData) {
      GetUserInfo(articleData.user.userId)
        .then((res) => {
          setAuthorInfo(res.data.data);
          setModalName(res.data.data.userName);
          setAuthorType(res.data.data.userType);
        })
        .catch((e) => alert("유저 정보를 불러오는 데에 실패했습니다😿"));
    }
  }, [articleData]);

  const handleOnProfilePage = () => {
    if (articleData.user.userId === myId) {
      navigate("/mypage");
    } else {
      navigate(`/profiles/${articleData.user.userId}`);
    }
    detailHandler();
  };

  return (
    <>
      <Wrapper>
        <Info>
          <Avatar
            className="avatar"
            width="40px"
            height="40px"
            bgUrl={authorInfo?.userImg}
            onClick={handleOnProfilePage}
          />
          <AuthorName onClick={handleOnProfilePage}>{authorInfo?.userName}</AuthorName>
          <TimeStamp>{DisplayCreatedAt(articleData?.createdAt)}</TimeStamp>
        </Info>
        <Conts>{articleData?.content}</Conts>
      </Wrapper>
    </>
  );
};

export default DetailArticle;
