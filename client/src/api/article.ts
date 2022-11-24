import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const RegisterArticle = async (formData: FormData, token: string) => {
  const response = await axios.post(`${URL}/articles`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    },
  });

  return response;
};

export const UpdateArticle = async (formData: FormData, articleId: string, token: string) => {
  const response = await axios.patch(`${URL}/articles/${articleId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    },
  });

  return response;
};

export const GetDetail = async (articleId: string | number, token: string | null) => {
  if (token) {
    const response = await axios.get(`${URL}/articles/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  } else {
    const response = await axios.get(`${URL}/articles/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
};

export const DeleteArticle = async (articleId: number, token: string | null) => {
  if (token) {
    const response = await axios.delete(`${URL}/articles/${articleId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  }
};

export const PostArticleLike = async (articleId: number | null, token: string) => {
  const response = await axios.post(`${URL}/articles/${articleId}/likes`, null, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const DeleteArticleLike = async (articleId: number | null, token: string) => {
  const response = await axios.delete(`${URL}/articles/${articleId}/likes`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const PostArticleReport = async (articleId: string | number, content: string, token: string | null) => {
  const body = JSON.stringify({
    content: `${content}`,
  });

  const response = await axios.post(`${URL}/articles/${articleId}/report`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response;
};
