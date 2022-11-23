import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const RegisterArticle = async (formData: FormData) => {
  const response = await axios.post(`${URL}/articles`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const UpdateArticle = async (formData: FormData, articleId: string) => {
  const response = await axios.patch(`${URL}/articles/${articleId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const GetDetail = async (articleId: string | number) => {
  const response = await axios.get(`${URL}/articles/${articleId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const GetMain = async (page: number, sort: string, order: string) => {
  const response = await axios.get(`${URL}/articles?page=${page}&sort=${sort}&order=${order}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
