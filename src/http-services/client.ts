import Axios, {
    AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from "axios";


function makeService<T, U>(client: AxiosInstance) {
    return {
        async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
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
    baseURL: process.env.REACT_APP_AUTH_URL, headers: {
        "Content-Type": "application/json"
    }
})

export const authClient = makeService(authAxios);