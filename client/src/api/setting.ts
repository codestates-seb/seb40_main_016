import axios from "axios";

const URL = process.env.REACT_APP_URL;

export const PatchProfile = async (userId: number, formData: FormData, token: string) => {
  const response = await axios.patch(`${URL}/user/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token}`,
    },
  });

  return response;
};
