import imageCompression from "browser-image-compression";

import { FileFormatCheck, FileSizeCheck } from "./FileValidCheck";
import { UploadedPhotos } from "../types/article";

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

    const compressedFile = files[i].type !== "image/gif" ? await imageCompression(files[i], options) : files[i];
    const file = new File([compressedFile], files[i].name, { type: files[i].type });
    const url = URL.createObjectURL(compressedFile);

    if (!isAvatar) {
      setUploadedPhotos((photo) => [...photo, { uploadedPhoto: url, file: file }].slice(0, 3));
    } else {
      setUploadedPhotos(() => [{ uploadedPhoto: url, file: file }]);
    }
  }
};
