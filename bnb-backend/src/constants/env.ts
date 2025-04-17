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
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const SPOTIFY_CLIENT_ID = getEnv("SPOTIFY_CLIENT_ID");
export const SPOTIFY_CLIENT_SECRET = getEnv("SPOTIFY_CLIENT_SECRET");
export const SPOTIFY_TOKEN_URL = getEnv("SPOTIFY_TOKEN_URL");
export const SPOTIFY_PROFILE_URL = getEnv("SPOTIFY_PROFILE_URL");
export const REDIRECT_URI = getEnv("REDIRECT_URI");
export const API_URL = getEnv("API_URL");
export const EMAIL_SERVER_HOST = getEnv("EMAIL_SERVER_HOST");
export const EMAIL_SERVER_PORT = getEnv("EMAIL_SERVER_PORT");
export const EMAIL_SERVER_USER = getEnv("EMAIL_SERVER_USER");
export const EMAIL_SERVER_PASSWORD = getEnv("EMAIL_SERVER_PASSWORD");
export const EMAIL_SERVER_SECURE = getEnv("EMAIL_SERVER_PASSWORD");
export const LAST_FM_API_KEY = getEnv("LAST_FM_API_KEY");
export const LAST_FM_SHARED_SECRET = getEnv("LAST_FM_SHARED_SECRET");
export const PAYPAL_WEBHOOK_ID = getEnv("PAYPAL_WEBHOOK_ID");
export const PAYPAL_CLIENT_ID = getEnv("PAYPAL_API_KEY");
export const PAYPAL_SECRET = getEnv("PAYPAL_SECRET");

//https://accounts.spotify.com/api/token
