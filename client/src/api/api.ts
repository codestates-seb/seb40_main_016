import axios from "axios";
import { SignupUserInfo, SignupPersonInfo } from "../types/user";

const URL = process.env.REACT_APP_URL;

export const PostSignUp = async (body: SignupUserInfo | SignupPersonInfo) => {
  const response = await axios.post(`${URL}/user`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const GetMain = async (page: number, size: number) => {
  const response = await axios.get(
    `http://ec2-13-124-50-180.ap-northeast-2.compute.amazonaws.com:8080/articles?page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};
