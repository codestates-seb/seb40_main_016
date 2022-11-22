import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const GetMain = async (page: number, sort: string, order: string) => {
  const response = await axios.get(`${URL}/articles?page=${page}&sort=${sort}&order=${order}`, {
    headers: {
      "Content-Type": "application/json",
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
