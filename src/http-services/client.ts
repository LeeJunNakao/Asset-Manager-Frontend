import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

function makeService<T, U>(client: AxiosInstance) {
  return {
    async get(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse> {
      return client.get(url, config);
    },
    async post(url: string, data: T): Promise<AxiosResponse> {
      return client.post(url, data);
    },
    async put(url: string, data: U): Promise<AxiosResponse> {
      return client.put(url, data);
    },
    async del(url: string): Promise<AxiosResponse> {
      return client.delete(url);
    },
    client(): AxiosInstance {
      return client;
    },
  };
}

const authAxios = Axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const entityAxios = Axios.create({
  baseURL: process.env.REACT_APP_ENTITITES_URL,
  headers: {
    'Content-Type': 'application/json',
    user_id: localStorage.getItem('user_id') || '',
    access_token: localStorage.getItem('access_token') || '',
  },
});

entityAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem('access_token') as string;
  const userId = localStorage.getItem('user_id') as string;
  (config.headers as AxiosRequestHeaders).access_token = token;
  (config.headers as AxiosRequestHeaders).user_id = userId;
  return config;
});

entityAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const authClient = makeService(authAxios);
export const client = makeService(entityAxios);
