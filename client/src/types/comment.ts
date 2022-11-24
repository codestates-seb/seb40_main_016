interface CommentWriter {
  userId: number;
  userImg: string;
  userName: string;
  userStatus: string;
}

export interface CommentType {
  commentId: number;
  content: string;
  createdAt: string;
  gotLiked?: boolean;
  likeCnt: number;
  reportCnt: number;
  user: CommentWriter;
}
