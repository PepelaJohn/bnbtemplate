//api/auth/login, register, logout, refresh
import { catchErrors } from "@/constants";
import { navigate } from "@/lib/navigation";
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error(
    "Please ensure your environment configuration is properly set!!"
  );
}
export const UNAUTHORIZED = 401;
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


export const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);
ApiInstance.interceptors.response.use(
    (response) =>{
        return response.data
    },
    async (error) => {
      const { config, response } = error;
      const { status, data } = response || {};
  
      // try to refresh the access token behind the scenes
      console.log(data)
      if (status === UNAUTHORIZED && data === "InvalidAccessToken") {
        try {
          // refresh the access token, then retry the original request
         
          await TokenRefreshClient.post("api/auth/refresh");
          return TokenRefreshClient(config);
        } catch (error) {
          // handle refresh errors by clearing the query cache & redirecting to login
         
          (navigate as any).push("/login");
        }
      }
  
      return Promise.reject({ status, ...data });
    }
  );
 
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


export const logout = async () => ApiInstance.patch("api/auth/logout");
export const verifyEmail = async (verificationCode: any) =>
  ApiInstance.get(`api/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email: any) =>
  ApiInstance.post("api/auth/password/forgot", { email });
export const resetPassword = async ({
  verificationCode,
  password,
}: {
  verificationCode: string;
  password: string;
}) =>
  ApiInstance.post("api/auth/password/reset", { verificationCode, password });

export const getUser = async () => ApiInstance.get("api/users/me");
export const getSessions = async () => ApiInstance.get("api/sessions");
export const deleteSession = async (id:string) => ApiInstance.delete(`api/sessions/${id}`);