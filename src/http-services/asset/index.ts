import { client } from 'http-services/client';

export const getAsset = async () => {
  const response = await client.get('/asset');
  return response.data;
};
