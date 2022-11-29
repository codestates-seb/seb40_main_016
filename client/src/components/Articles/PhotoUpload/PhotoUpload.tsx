/*
담당 : 김윤희
생성 : 2022.11.17
수정 : 2022.11.27
소개 : 이미지 업로드 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 이미지 업로드 컴포넌트입니다.
  - 업로드된 파일의 임시주소와 파일 상태를 같이 관리할 수 있도록 수정
  - 사진 업로드하는 로직 분리
  - 사용 예시: 
    <PhotoUpload
      uploadedPhotos={uploadedPhotos}
      previewPhotos={previewPhotos}
      currentPhotos={currentPhotos}
      setUploadedPhotos={setUploadedPhotos}
      setPreviewPhotos={setPreviewPhotos}
      setCurrentPhotos={setCurrentPhotos}
    />
*/

import React, { useRef, useState, useEffect } from "react";

import PhotoPreview from "../PhotoPreview/PhotoPreview";

import { ReactComponent as EmptyPhoto } from "../../../assets/img/empty-photo-icon.svg";
import { ReactComponent as AddPhoto } from "../../../assets/img/add-photo-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/img/add-icon.svg";
import { compresseAndUploadFile } from "../../../utills/CompressAndUploadFile";

import { PhotoWrapper, CurrentPhoto, PhotoChoiceWrapper, PhotoListWrapper, PhotoList, UploadButton } from "./style";
import { UploadedPhotos } from "../../../types/article";

interface PhotoUploadProps {
  uploadedPhotos: UploadedPhotos[];
  previewPhotos: any[];
  currentPhotos: string;
  isAddPhoto: boolean;
  setUploadedPhotos: (arg: (arg: UploadedPhotos[]) => UploadedPhotos[]) => void;
  setPreviewPhotos: (arg: () => any[]) => void;
  setCurrentPhotos: (arg: () => string) => void;
  setIsAddPhoto: (arg: (arg: boolean) => boolean) => void;
}

const PhotoUpload = ({
  uploadedPhotos,
  previewPhotos,
  currentPhotos,
  isAddPhoto,
  setUploadedPhotos,
  setPreviewPhotos,
  setCurrentPhotos,
  setIsAddPhoto,
}: PhotoUploadProps) => {
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const files = e.target.files;
    compresseAndUploadFile(files, uploadedPhotos, setUploadedPhotos);
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = (e.dataTransfer as DataTransfer).files;
    compresseAndUploadFile(files, uploadedPhotos, setUploadedPhotos);
  };

  const dragOverHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const createPhotoPreview = uploadedPhotos.map((photo, index) => {
    const isDeleteImage = (element: any) => {
      return element.uploadedPhoto === photo.uploadedPhoto;
    };

    const deletePhoto = () => {
      uploadedPhotos.splice(uploadedPhotos.findIndex(isDeleteImage), 1);
      setUploadedPhotos((photos) => [...photos]);
      if (uploadedPhotos.length === 0) setIsAddPhoto((isAddPhoto) => !isAddPhoto);
    };

    return (
      <PhotoPreview
        photoUrl={photo.uploadedPhoto}
        deletePhoto={deletePhoto}
        key={index}
        setCurrentPhotos={setCurrentPhotos}
      />
    );
  });

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);

    const imageJSXs = createPhotoPreview;
    setCurrentPhotos(() => uploadedPhotos.length > 0 && uploadedPhotos[uploadedPhotos.length - 1].uploadedPhoto);
    setPreviewPhotos(() => imageJSXs);

    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, [uploadedPhotos]);

  return (
    <PhotoWrapper>
      {currentPhotos && <CurrentPhoto src={currentPhotos} alt="preview" />}

      <PhotoChoiceWrapper htmlFor="file" ref={uploadBoxRef}>
        <EmptyPhoto className="emptyPhoto" />
        <p>사진을 여기에 끌어다 놓으세요</p>
        <UploadButton htmlFor="file">컴퓨터에서 선택</UploadButton>
        <input type="file" multiple accept="image/*" id="file" ref={inputRef} hidden />
      </PhotoChoiceWrapper>

      {isAddPhoto && (
        <PhotoListWrapper>
          <PhotoList>{previewPhotos}</PhotoList>
          {previewPhotos.length < 3 && (
            <label htmlFor="file">
              <AddIcon className="addIcon" />
            </label>
          )}
        </PhotoListWrapper>
      )}

      {uploadedPhotos.length >= 1 && (
        <AddPhoto className="addPhoto" onClick={() => setIsAddPhoto((isAddPhoto) => !isAddPhoto)} />
      )}
    </PhotoWrapper>
  );
};

export default PhotoUpload;
