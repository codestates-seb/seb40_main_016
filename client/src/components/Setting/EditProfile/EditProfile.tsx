import React, { useState, useEffect } from "react";

import UserInfo from "./UserInfo/UserInfo";
import Button from "../../Button/Button";

import { Wrapper, UserInfoWrapper, AvatarWrapper, ButtonWrapper } from "./style";
import { compresseAndUploadFile } from "../../../utills/CompressAndUploadFile";
import { EditProfileInfo } from "../../../types/user";
import { UploadedPhotos } from "../../../types/article";
import { SettingProps } from "../../../types/setting";
import { GetUserInfo, PatchProfile } from "../../../api/user";

const EditProfile = ({ userId, token, movePage }: SettingProps) => {
  const [userInfo, setUserInfo] = useState<EditProfileInfo>({
    userName: "",
    content: "",
    userImg: "",
    userBirth: "",
    userType: "",
  });
  const [uploadedAvatar, setUploadedAvater] = useState<UploadedPhotos[]>([]);
  const [hasNoError, setHasNoError] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    compresseAndUploadFile(file, uploadedAvatar, setUploadedAvater, true);
  };

  const submitProfile = () => {
    if (userInfo.userName.length <= 0) {
      alert(userInfo.userType === "PERSON" ? "닉네임을 입력해주세요." : "이름을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    if (uploadedAvatar[0]) formData.append("file", uploadedAvatar[0].file);

    let body: EditProfileInfo = {
      userName: userInfo.userName,
      content: userInfo.content,
    };

    if (userInfo.userType !== "PERSON") {
      body.userBirth = userInfo.userBirth;
    }

    formData.append(
      "patchDto",
      new Blob([JSON.stringify(body)], {
        type: "application/json",
      }),
    );

    PatchProfile(userId, formData, token)
      .then((res: any) => {
        if (res.status === 200) {
          alert("프로필 수정 성공😺");
          movePage();
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          alert("프로필 수정 실패😿");
        }
      });
  };

  useEffect(() => {
    GetUserInfo(userId)
      .then((res) => res.data.data)
      .then((res) => {
        setUserInfo({
          userName: res.userName,
          content: res.content,
          userImg: res.userImg ? res.userImg : "./assets/default-avatar-bg.png",
          userBirth: res.userBirth,
          userType: res.userType,
        });
      });
  }, []);

  return (
    <Wrapper>
      <UserInfoWrapper>
        <AvatarWrapper>
          <img
            src={uploadedAvatar.length > 0 ? uploadedAvatar[0].uploadedPhoto : userInfo.userImg}
            alt="프로필 이미지"
          />
          <label htmlFor="avatar">프로필 사진 바꾸기</label>
          <input type="file" id="avatar" accept="image/*" onChange={changeHandler} hidden />
        </AvatarWrapper>
        <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} setHasNoError={setHasNoError} />
      </UserInfoWrapper>
      <ButtonWrapper>
        <Button width="200px" height="60px" isShadow={true} onClick={submitProfile} disabled={!hasNoError}>
          완료
        </Button>
        <Button
          width="200px"
          height="60px"
          isShadow={true}
          textColor="red"
          onClick={() => {
            if (confirm("변경사항이 저장되지 않습니다. 취소하시겠습니까?")) movePage();
          }}
        >
          취소
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EditProfile;
