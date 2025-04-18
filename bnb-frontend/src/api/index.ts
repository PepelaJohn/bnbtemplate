//api/auth/login, register, logout, refresh
import { catchErrors } from "@/constants";
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "Please ensure your environment configuration is properly set!!"
  );
}

const options = {
  baseURL: BASE_URL,
  withCredentials: true,
};
const authHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",

};

export const ApiInstance: AxiosInstance = axios.create({
  responseType: "json",

  withCredentials: true,
  baseURL: BASE_URL,

  headers: {
    ...authHeaders,
  },
});

ApiInstance.interceptors.response.use((data) => {
  return {...data.data, ok: data.status <400};
});

export const TokenRefreshClient = axios.create(options);
export const loginUser = catchErrors(
  async ({ email, password }: { email: string; password: string }) => {
    const response = await ApiInstance.post("/api/auth/login", {
      email,
      password,
    });

    // console.log(response);
    return response;
  }
);

type registerData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  name: string;
};

export const registerUser = async (data: registerData) => {
  try {
    const response = await ApiInstance.post("/api/auth/register", data, );
      console.log(response, "ajlkdf");
      return response;
  } catch (error:any) {
    console.log(error)
    return Promise.reject(error)
  }
};
