import { NextFunction, RequestHandler, Response,  } from "express";
import { catchErrors } from "../utils/catchErrors";
import { AppAssert } from "../utils/appAssert";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http";
import { accessTokenOptions, verifyToken } from "../utils/jwt";
import  Role  from '../interfaces/user.interface';
const authenticate: RequestHandler = catchErrors(async (req,res, next) => {
  const accessToken = req.cookies.access_token as string | undefined;
  AppAssert(accessToken, UNAUTHORIZED, "InvalidAccessToken");
  const { error, payload } = verifyToken(accessToken, accessTokenOptions);
  AppAssert(payload, UNAUTHORIZED, error || "InvalidAccessToken");
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  req.role = payload.role

  next();
});

export default authenticate

export const authorize = (roles: Role[]) => {
  return (req:any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.role)) {
      return res.status(FORBIDDEN).json({ message: 'Access denied' });
    }
    next();
  };
}
