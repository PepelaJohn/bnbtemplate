const getEnv = (name: string, defaultValue?:string) => {
  const value = process.env[name] || defaultValue;
  if (value === undefined) {
    throw new Error(`Could not load environment variable ${name}`);
  }

  return value;
};

export const PORT = getEnv("PORT");
export const MONGO_URI = getEnv("MONGO_URI");
export const NODE_ENV = getEnv("NODE_ENV");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_ACESS_SECRET = getEnv("JWT_ACESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const API_URL = getEnv("API_URL");
export const EMAIL_SERVER_HOST = getEnv("EMAIL_SERVER_HOST");
export const EMAIL_SERVER_PORT = getEnv("EMAIL_SERVER_PORT");
export const EMAIL_SERVER_USER = getEnv("EMAIL_SERVER_USER");
export const EMAIL_SERVER_PASSWORD = getEnv("EMAIL_SERVER_PASSWORD");
export const EMAIL_SERVER_SECURE = getEnv("EMAIL_SERVER_PASSWORD");
export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");


