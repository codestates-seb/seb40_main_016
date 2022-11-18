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
