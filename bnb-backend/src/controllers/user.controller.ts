import { NOT_FOUND, OK } from "../constants/http";
import User from "../models/User";
import { AppAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res): Promise<any> => {
  const user = await User.findById(req.userId);
  AppAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});
