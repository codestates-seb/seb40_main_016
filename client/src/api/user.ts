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
  const response = await axios.get(`${URL}/user/profile/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const PostHelpPw = async (email: string) => {
  const body = JSON.stringify({
    email: `${email}`,
  });

  const response = await axios.post(`${URL}/help/pw`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const PatchProfile = async (userId: number, formData: FormData, token: string) => {
  const response = await axios.patch(`${URL}/user/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    },
  });

  return response;
};

export const DeleteUser = async (userId: number, token: string) => {
  const response = await axios.delete(`${URL}/user/${userId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};

export const LoginGoogle = () => {
  location.href = `${URL}/oauth2/authorization/google`;
};
