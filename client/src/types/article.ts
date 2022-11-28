export interface UploadedPhotos {
  uploadedPhoto: string;
  file?: File;
}

export interface DetailData {
  articleId: number;
  articleImg: string[];
  articleStatus: string;
  content: string;
  createdAt: string;
  likeCnt: number;
  reportCnt: number;
  updatedAt: string;
  view: number;
  yummyCnt: number;
}
