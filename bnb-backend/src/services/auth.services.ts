import mongoose from "mongoose";
import { APP_ORIGIN } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import Session from "../models/Session";
import User from "../models/User";
import VerificationCode, {
  VerificationCodeType,
} from "../models/VerificationCode";
import { AppAssert } from "../utils/appAssert";
import { timeFromNow } from "../utils/date";
import {
  accessTokenOptions,
  refreshTokenOptions,
  RefreshTokenPayload,
  signToken,
  verifyToken,
} from "../utils/jwt";

export type UserProps = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};
export const CreateUser = async (data: UserProps) => {
  const existingUser = await User.exists({
    email: data.email,
  });

  AppAssert(!existingUser, CONFLICT, "Email already in use", CONFLICT);

  const user = await User.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;
  const verificationCode = await VerificationCode.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: timeFromNow("d", 1),
  });

  const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`;

  // Send Email

  const session = await Session.create({
    userId,
    userAgent: data.userAgent,
  });

  const refreshToken :string = signToken(
    {
      sessionId: session._id as mongoose.Types.ObjectId,
    },
    refreshTokenOptions
  );
  const accessToken = signToken(
    {
      userId: user._id as mongoose.Types.ObjectId,
      sessionId: session._id as mongoose.Types.ObjectId,
    },
    accessTokenOptions
  );

  return {
    user: user.omitPassword(),
    refreshToken,
    accessToken,
  };
};

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginuser = async (data: LoginParams) => {
  const { email, password, userAgent } = data;
  

  const foundUser = await User.findOne({ email });

  AppAssert(foundUser, UNAUTHORIZED, "Invalid email or password");

  const isValid = await foundUser.comparePassword(password);
  AppAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = foundUser._id;
  const session = await Session.create({
    userId,
    userAgent,
  });

  const sessionInfo: RefreshTokenPayload = {
    sessionId: session._id as mongoose.Types.ObjectId,
  };

  const accessToken = signToken(
    {
      userId: userId as mongoose.Types.ObjectId,
      ...sessionInfo,
    },
    accessTokenOptions
  );

  const refreshToken = signToken(sessionInfo, refreshTokenOptions);

  return {
    user: foundUser.omitPassword(),
    refreshToken,
    accessToken,
  };
};

export const refreshAcessToken = async (refreshToken: string) => {
  const { payload, error } = verifyToken(refreshToken, refreshTokenOptions);
  AppAssert(payload, UNAUTHORIZED, error || "Invalid refresh Token");

  const session = await Session.findById(payload.sessionId);

  AppAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session Expired"
  );

  const accessToken = signToken(
    {
      sessionId: session._id as mongoose.Types.ObjectId,
      userId: session.userId,
    },
    accessTokenOptions
  );

  const sessionNeedsRefresh =
    session.expiresAt.getTime() - Date.now() <= 24 * 60 * 60 * 1000;
  if (sessionNeedsRefresh) {
    session.expiresAt = timeFromNow("d", 30);
    await session.save();
  }

  const newRefreshToken:string | undefined = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: session._id as mongoose.Types.ObjectId,
        },
        refreshTokenOptions
      )
    : undefined;

  return {
    accessToken,
    newRefreshToken,
  };
};
