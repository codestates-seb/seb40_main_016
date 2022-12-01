import axios from "axios";

const URL = process.env.REACT_APP_URL;

// 마이페이지

export const GetMyProfile = async (token: string) => {
  const response = await axios.get(`${URL}/user/my-page`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const GetMyArticles = async (page: number, tab: string, token: string | null) => {
  const response = await axios.get(`${URL}/articles/my-page?page=${page}&tab=${tab}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const GetMyComments = async (page: number, token: string) => {
  const response = await axios.get(`${URL}/comments/my-page?page=${page}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const GetMySnacks = async (page: number, token: string) => {
  const response = await axios.get(`${URL}/order/my-page?page=${page}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

// 프로필

export const GetProfile = async (userId: string | number) => {
  const response = await axios.get(`${URL}/user/profile/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const GetUserArticles = async (userId: string | number, page: number) => {
  const response = await axios.get(`${URL}/articles/profile/${userId}?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const GetUserSnacks = async (userId: string | number, page: number) => {
  const response = await axios.get(`${URL}/order/profile/${userId}?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
