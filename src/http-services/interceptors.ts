import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { setLogout } from 'store/auth';

export const setInterceptor = (store: any, client: AxiosInstance) => {
  client.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error: AxiosError<AxiosResponse>) {
      const response = error.response;
      if (response && response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        store.dispatch(setLogout());
      }
      return Promise.reject(error);
    }
  );
};
