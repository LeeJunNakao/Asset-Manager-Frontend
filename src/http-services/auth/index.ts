import { authClient } from 'http-services/client';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type RecoverData = {
  email: string;
};

type LoginResponse = {
  token: string;
};

type ValidateTokenData = {
  token: string;
};

type ValidateTokenResponse = {
  id: number;
  name: string;
  email: string;
};

type RecoverResponse = {
  message: string;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await authClient.post('/signin', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  const response = await authClient.post('/signup', data);
  return response.data;
};

export const recoverPassword = async (
  data: RecoverData
): Promise<RecoverResponse> => {
  const response = await authClient.post('/recover-password', data);
  return response.data;
};

export const validateToken = async (
  data: ValidateTokenData
): Promise<ValidateTokenResponse> => {
  const response = await authClient.post('/validate-token', data);
  return response.data;
};
