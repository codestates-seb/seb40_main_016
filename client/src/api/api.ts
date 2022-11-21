import axios from "axios";
import { SignupUserInfo, SignupPersonInfo, LoginInfo } from "../types/user";

const URL = process.env.REACT_APP_URL;
const TOKEN = process.env.TOKEN;

export const PostSignUp = async (body: SignupUserInfo | SignupPersonInfo) => {
  const response = await axios.post(`${URL}/user`, JSON.stringify(body), {
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
      Authorization: `${TOKEN}`,
    },
  });
  return response;
};

export const GetMyPage = async (userId: number) => {
  const response = await axios.get(`${URL}/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const PostLogin = async (body: LoginInfo) => {
  const response = await axios.post(`${URL}/auth/login`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
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

export const GetUserInfo = async (userId: string | number) => {
  const response = await axios.get(`${URL}/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
