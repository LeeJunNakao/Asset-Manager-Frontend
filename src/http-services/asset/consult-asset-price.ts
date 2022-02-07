import { client } from '../client';

type PriceData = {
  date: string;
  price: number;
};

export const getPrice = async (code: string): Promise<number> => {
  const response = await client.get(`/asset/price/${code}`);
  const result = response.data;

  return result.price;
};
