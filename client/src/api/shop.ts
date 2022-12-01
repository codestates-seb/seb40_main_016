import axios from "axios";
import { OrderItemsProps } from "../types/shop";

const URL = process.env.REACT_APP_URL;

export const GetItems = async (token: string) => {
  const response = await axios.get(`${URL}/items`, {
    headers: { Authorization: `${token}` },
  });

  return response.data;
};

export const OrderItems = async (body: OrderItemsProps[], token: string) => {
  const response = await axios.post(`${URL}/order`, JSON.stringify({ orderItems: body }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  return response.data;
};
