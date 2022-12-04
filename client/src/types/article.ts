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
  gotLiked: boolean;
  user?: User;
}

interface User {
  userId?: number;
  userImg?: string;
  userName?: string;
  userStatus?: string;
}

export interface Articles {
  articleId: number;
  articleImg: ArticleImg;
  content: string;
  likeCnt: number;
  views: number;
  reportCnt: number;
  articleStatus: string;
  yummyCnt: number;
}

export interface ArticleImg {
  [index: number]: any;
  images: Images[];
}

export interface Images {
  articleImgId: number;
  imgUrl: string;
}
