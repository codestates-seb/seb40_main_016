import axios from "axios";
import { SignupUserInfo, SignupPersonInfo } from "../types/user";
import { ArticleInfo } from "../types/article";

const URL = process.env.REACT_APP_URL;

export const PostSignUp = async (body: SignupUserInfo | SignupPersonInfo) => {
  const response = await axios.post(`${URL}/user`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const SubmitNewArticle = async (body: ArticleInfo) => {
  const response = await axios.post(`${URL}/articles`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
