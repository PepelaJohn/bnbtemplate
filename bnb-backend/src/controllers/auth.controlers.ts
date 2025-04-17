import { Response } from "express";
import { CREATED, NO_CONTENT, OK, UNAUTHORIZED } from "../constants/http";
import Session from "../models/Session";
import {
  CreateUser,
  loginuser,
  refreshAcessToken,
  UserProps,
} from "../services/auth.services";
import { AppAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";
import { accessTokenOptions, verifyToken } from "../utils/jwt";
import { clearAuthCookies, setAuthCookies } from "../utils/setCookies";
import { loginSchema, registerSchema } from "./auth.schema";

export const registerHandler = catchErrors(async (req, res): Promise<any> => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"] || "Unknown Agent",
  });

  const { user, accessToken, refreshToken } = await CreateUser(
    request as unknown as UserProps
  );
  return setAuthCookies(res, accessToken, refreshToken)
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res): Promise<any> => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"] || "Unknown Agent",
  });

  const { accessToken, refreshToken, user } = await loginuser(request);

  return setAuthCookies(res, accessToken, refreshToken)
    .status(OK)
    .json({ message: "Login success", user });
});

export const logoutHandler = catchErrors(async (req, res): Promise<any> => {
  const accessToken = (req.cookies.access_token as string) || "";
  //   AppAssert(accessToken, UNAUTHORIZED, "Failed to logout");

  const { payload, error } = verifyToken(accessToken, accessTokenOptions);

  AppAssert(payload, UNAUTHORIZED, error || "Failed to logout");

  if (payload) {
    await Session.findByIdAndDelete(payload?.sessionId);
  }

  return clearAuthCookies(res)
    .status(NO_CONTENT)
    .json("Successfully Logged Out");
});

export const refreshHandler = catchErrors(async (req, res): Promise<any> => {
  const refreshToken = req.cookies.refresh_token as string;
  AppAssert(
    refreshToken,
    UNAUTHORIZED,
    "No refresh token or invalid refresh token."
  );

  const { accessToken, newRefreshToken } = await refreshAcessToken(
    refreshToken
  );

  return setAuthCookies(res, accessToken, newRefreshToken)
    .sendStatus(NO_CONTENT)
   
});
