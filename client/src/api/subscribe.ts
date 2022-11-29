import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const GetIsSubscribe = async (myId: number, authorId: number) => {
  const response = await axios.get(`${URL}/follow/${myId}/${authorId}`);
  return response;
};

export const PostSubscribe = async (myId: number, authorId: number, token: string) => {
  const response = await axios.post(`${URL}/follow/${myId}/${authorId}`, null, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const DeleteSubscribe = async (myId: number, authorId: number, token: string) => {
  const response = await axios.delete(`${URL}/follow/${myId}/${authorId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response;
};

export const GetFollowList = async (myId: number) => {
  const response = await axios.get(`${URL}/follow/${myId}`);
  return response;
};

export const GetFollowerList = async (myId: number) => {
  const response = await axios.get(`${URL}/follower/${myId}`);
  return response;
};
