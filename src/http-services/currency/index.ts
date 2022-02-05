import { client } from 'http-services/client';
import { Currency } from 'entities/currency';

const URL = '/currency';

export const getCurrency = async (): Promise<Currency[]> => {
  const response = await client.get(URL);
  return response.data;
};

export const editCurrency = async (data: Currency) => {
  const response = await client.put(`${URL}/${data.id}`, data);
  return response.data;
};

export const createCurrency = async (data: Omit<Currency, 'id'>) => {
  const response = await client.post(URL, data);
  return response.data;
};

export const deleteCurrency = async (id: number) => {
  await client.del(`${URL}/${id}`);
};
