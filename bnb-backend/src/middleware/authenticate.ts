import { NextFunction, RequestHandler, Response,  } from "express";
import { catchErrors, CustomController } from "../utils/catchErrors";
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
   return catchErrors(async(req, res, next) => {
    AppAssert(roles.includes(req.role), FORBIDDEN, "Access Denied")
    
    next();
  } )
}
