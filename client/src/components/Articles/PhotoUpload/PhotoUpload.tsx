/*
담당 : 김윤희
생성 : 2022.11.17
수정 : 2022.11.22
소개 : 이미지 업로드 컴포넌트
설명 : 
  - 글 작성, 수정시 사용되는 이미지 업로드 컴포넌트입니다.
  - 업로드된 파일의 임시주소와 파일 상태를 같이 관리할 수 있도록 수정
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
import imageCompression from "browser-image-compression";
import PhotoPreview from "../PhotoPreview/PhotoPreview";
import { UploadedPhotos } from "../../../types/article";
import { PhotoWrapper, CurrentPhoto, PhotoChoiceWrapper, PhotoListWrapper, PhotoList, UploadButton } from "./style";
import { ReactComponent as EmptyPhoto } from "../../../assets/img/empty-photo-icon.svg";
import { ReactComponent as AddPhoto } from "../../../assets/img/add-photo-icon.svg";
import { ReactComponent as AddIcon } from "../../../assets/img/add-icon.svg";
import { FileFormatCheck, FileSizeCheck } from "../../../utills/FileValidCheck";

interface PhotoUploadProps {
  uploadedPhotos: UploadedPhotos[];
  previewPhotos: any[];
  currentPhotos: string;
  setUploadedPhotos: (arg: (arg: UploadedPhotos[]) => UploadedPhotos[]) => void;
  setPreviewPhotos: (arg: () => any[]) => void;
  setCurrentPhotos: (arg: () => string) => void;
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

  const createBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia]);
  };

  const compresseAndUploadFile = async (files: FileList | null) => {
    if (!files) return;
    if (files.length + uploadedPhotos.length > 3) {
      alert("이미지는 최대 3장까지 업로드할 수 있습니다.");
      return;
    }

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
    };

    for (let i = 0; i < files.length; i++) {
      if (!FileFormatCheck || !FileSizeCheck) continue;

      const reader = new FileReader();
      const compressedFile = await imageCompression(files[i], options);

      reader.onloadend = () => {
        const result = reader.result as string;

        const blob = createBlob(result);
        const file = new File([blob], files[i].name, { type: files[i].type });
        if (result) setUploadedPhotos((state) => [...state, { uploadedPhoto: result, file: file }].slice(0, 3));
      };

      reader.readAsDataURL(compressedFile);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const files = e.target.files;
    compresseAndUploadFile(files);
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = (e.dataTransfer as DataTransfer).files;
    compresseAndUploadFile(files);
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
