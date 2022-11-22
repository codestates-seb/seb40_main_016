import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const registerArticle = async (formData: FormData) => {
  const response = await axios.post(`${URL}/articles`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const updateArticle = async (formData: FormData, articleId: string) => {
  const response = await axios.patch(`${URL}/articles/${articleId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const getArticle = async (articleId: string) => {
  return await axios.get(`${URL}/articles/${articleId}`);
};
