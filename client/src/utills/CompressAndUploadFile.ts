import imageCompression from "browser-image-compression";

import { FileFormatCheck, FileSizeCheck } from "./FileValidCheck";
import { UploadedPhotos } from "../types/article";

const createBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia]);
};

export const compresseAndUploadFile = async (
  files: FileList,
  uploadedPhotos: UploadedPhotos[],
  setUploadedPhotos?: (arg: (arg: UploadedPhotos[]) => UploadedPhotos[]) => void,
  isAvatar?: boolean,
) => {
  if (!files) return;
  if (!isAvatar && files.length + uploadedPhotos.length > 3) {
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

      if (result) {
        if (!isAvatar) {
          setUploadedPhotos((photo) => [...photo, { uploadedPhoto: result, file: file }].slice(0, 3));
        } else {
          setUploadedPhotos(() => [{ uploadedPhoto: result, file: file }]);
        }
      }
    };

    reader.readAsDataURL(compressedFile);
  }
};
