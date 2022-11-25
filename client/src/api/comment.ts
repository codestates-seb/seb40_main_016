import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const GetComments = async (articleId: number, page: number, token: string) => {
  if (token) {
    const response = await axios.get(`${URL}/comments/${articleId}?page=${page}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } else {
    const response = await axios.get(`${URL}/comments/${articleId}?page=${page}`);
    return response;
  }
};

export const PostComments = async (articleId: number, content: string, token: string) => {
  const body = JSON.stringify({
    content: `${content}`,
  });

  const response = await axios.post(`${URL}/comments/${articleId}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  return response;
};

export const DeleteComment = async (commentId: number, token: string) => {
  const response = await axios.delete(`${URL}/comments/${commentId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};

export const PostCommentLike = async (commentId: number, token: string) => {
  const response = await axios.post(`${URL}/comments/${commentId}/likes`, null, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};

export const DeleteCommentLike = async (commentId: number, token: string) => {
  const response = await axios.delete(`${URL}/comments/${commentId}/likes`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};

export const PostCommentReport = async (commentId: string | number, content: string, token: string | null) => {
  const body = JSON.stringify({
    content: `${content}`,
  });

  const response = await axios.post(`${URL}/comments/${commentId}/report`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response;
};
