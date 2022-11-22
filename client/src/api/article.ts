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

export const GetDetail = async (articleId: string | number) => {
  const response = await axios.get(`${URL}/articles/${articleId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
