import axios from "axios";
import { SignupUserInfo, SignupPersonInfo, LoginInfo } from "../types/user";

const URL = process.env.REACT_APP_URL;

export const PostSignUp = async (body: SignupUserInfo | SignupPersonInfo) => {
  const response = await axios.post(`${URL}/user`, JSON.stringify(body), {
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

export const GetUserInfo = async (userId: string | number) => {
  const response = await axios.get(`${URL}/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
