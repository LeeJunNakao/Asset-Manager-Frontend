import { client } from 'http-services/client';
import { AssetEntry } from 'entities/asset';

export const getAssetEntry = async () => {
  const response = await client.get('/asset-entry');
  return response.data;
};

export const editAssetEntry = async (data: AssetEntry) => {
  const response = await client.put(`/asset/${data.id}`, data);
  return response.data;
};

export const createAssetEntry = async (data: Omit<AssetEntry, 'id'>) => {
  const response = await client.post('/asset', data);
  return response.data;
};

export const deleteAssetEntry = async (id: number) => {
  await client.del(`/asset/${id}`);
};
