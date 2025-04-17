import { Response } from "express";
import { timeFromNow } from "./date";

export const defaultOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as "strict",
};



export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken?: string
) => {
  !!refreshToken &&
    res.cookie("refresh_token", refreshToken, {
      ...defaultOptions,
      expires: timeFromNow("mo", 1),
      path: "auth/refresh",
    });
  return res.cookie("access_token", accessToken, {
    ...defaultOptions,
    expires: timeFromNow("m", 10),
  });
};

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("access_token")
    .clearCookie("refresh_token", { path: "auth/refresh" });
