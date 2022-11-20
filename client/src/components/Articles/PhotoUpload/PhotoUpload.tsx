/*
담당 : 김윤희
생성 : 2022.11.17
수정 : 2022.11.19
소개 : 이미지 업로드 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 이미지 업로드 컴포넌트입니다.
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
import { PhotoWrapper, CurrentPhoto, PhotoChoiceWrapper, PhotoListWrapper, PhotoList, UploadButton } from "./style";
import { ReactComponent as EmptyPhoto } from "../../../assets/img/empty-photo-icon.svg";
import { ReactComponent as AddPhoto } from "../../../assets/img/add-photo-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/img/add-icon.svg";

interface PhotoUploadProps {
  uploadedPhotos: string[];
  previewPhotos: any[];
  currentPhotos: string;
  setUploadedPhotos: (arg: string[]) => void;
  setPreviewPhotos: (arg: any[]) => void;
  setCurrentPhotos: (arg: string) => void;
}

const PhotoUpload = ({
  uploadedPhotos,
  previewPhotos,
  currentPhotos,
  setUploadedPhotos,
  setPreviewPhotos,
  setCurrentPhotos,
}: PhotoUploadProps) => {
  const [isAddPhoto, setIsAddPhoto] = useState<boolean>(false);
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const handleFiles = (files: FileList | null) => {
      if (!files) return;

      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith("image/")) continue;

        const reader = new FileReader();
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          const result = e.target.result as string;

          if (result) {
            setUploadedPhotos([...uploadedPhotos, result].slice(0, 3));
          }
        };

        reader.readAsDataURL(files[i]);
      }
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const files = e.target.files;
      handleFiles(files);
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const files = (e.dataTransfer as DataTransfer).files;
      handleFiles(files);
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);

    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, [uploadedPhotos]);

  useEffect(() => {
    const imageJSXs = uploadedPhotos.map((photo, index) => {
      const isDeleteImage = (element: any) => {
        return element === photo;
      };

      const deletePhoto = () => {
        uploadedPhotos.splice(uploadedPhotos.findIndex(isDeleteImage), 1);
        setUploadedPhotos([...uploadedPhotos]);
        if (uploadedPhotos.length === 0) setIsAddPhoto((isAddPhoto) => !isAddPhoto);
      };

      return (
        <PhotoPreview photoUrl={photo} deletePhoto={deletePhoto} key={index} setCurrentPhotos={setCurrentPhotos} />
      );
    });

    setCurrentPhotos(uploadedPhotos[uploadedPhotos.length - 1]);
    setPreviewPhotos(imageJSXs);
  }, [uploadedPhotos]);

  return (
    <PhotoWrapper>
      {currentPhotos && <CurrentPhoto src={currentPhotos} alt="preview" />}

      <PhotoChoiceWrapper>
        <label htmlFor="file" ref={uploadBoxRef}>
          <EmptyPhoto className="emptyPhoto" />
          <p>사진을 여기에 끌어다 놓으세요</p>
        </label>
        <UploadButton htmlFor="file">컴퓨터에서 선택</UploadButton>
        <input type="file" multiple accept="image/*" id="file" ref={inputRef} hidden />
      </PhotoChoiceWrapper>

      {isAddPhoto && uploadedPhotos.length > 0 && (
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
