import { authClient } from "http-services/client";

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = {
    name: string;
    email: string;
    password: string;
}

type LoginResponse = {
    token: string
}


export const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await authClient.post("/signin", data);
    return response.data;
}

export const register = async (data: RegisterData): Promise<LoginResponse> => {
    const response = await authClient.post("/signup", data);
    return response.data;
}