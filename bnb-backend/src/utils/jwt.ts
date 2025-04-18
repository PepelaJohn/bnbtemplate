//jwt.ts
import mongoose from "mongoose";
import { JWT_ACESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";
import Audience from "../constants/audience";
import jwt, { VerifyOptions } from "jsonwebtoken";
import AppError from "./AppError";
export type RefreshTokenPayload = {
  sessionId: mongoose.Types.ObjectId;
};

export type AccessTokenPayload = {
  sessionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: "guest" | "admin" | "super_admin";
};

export const refreshTokenOptions = {
  secret: JWT_REFRESH_SECRET,
  expiresIn: "30d"  as jwt.SignOptions["expiresIn"],
  audience: [Audience.User],
};
export const accessTokenOptions = {
  secret: JWT_ACESS_SECRET,
  expiresIn: "15m" as jwt.SignOptions["expiresIn"],
  audience: [Audience.User],
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options: typeof refreshTokenOptions
) => {
  const { secret, ...signOpts } = options;
  return jwt.sign(payload, secret, {
    ...signOpts,
  });
};

interface TVerifyOptions extends VerifyOptions {
  secret: string;
}

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options: TVerifyOptions
) => {
  const { secret, ...verifyOpts } = options;

  try {
    const payload = jwt.verify(token, secret, {
      ...verifyOpts,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
