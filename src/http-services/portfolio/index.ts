import { client } from 'http-services/client';
import { Portfolio } from 'entities/portfolio';

const URL = '/portfolio';

export const getPortfolio = async () => {
  const response = await client.get(URL);
  return response.data;
};

export const editPortfolio = async (data: Portfolio) => {
  const response = await client.put(`${URL}/${data.id}`, data);
  return response.data;
};

export const createPortfolio = async (data: Omit<Portfolio, 'id'>) => {
  const response = await client.post(URL, data);
  return response.data;
};

export const deletePortfolio = async (id: number) => {
  await client.del(`${URL}/${id}`);
};
