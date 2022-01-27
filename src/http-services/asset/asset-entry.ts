import { client } from 'http-services/client';
import { AssetEntry } from 'entities/asset';

const URL = '/asset-entry';

export const getAssetEntry = async () => {
  const response = await client.get(URL);
  return response.data;
};

export const editAssetEntry = async (data: AssetEntry) => {
  const response = await client.put(`${URL}/${data.id}`, data);
  return response.data;
};

export const createAssetEntry = async (data: Omit<AssetEntry, 'id'>) => {
  const response = await client.post(URL, data);
  return response.data;
};

export const deleteAssetEntry = async (id: number) => {
  await client.del(`${URL}/${id}`);
};
