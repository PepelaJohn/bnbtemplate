import { z } from "zod";
import { catchErrors } from "../utils/catchErrors";
import Session from "../models/Session";
import { AppAssert } from "../utils/appAssert";
import {
  BAD_REQUEST,
  HTTP_MESSAGES,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/http";

export const getSessionHandler = catchErrors(async (req, res): Promise<any> => {
  const foundSessions = await Session.find(
    {
      userId: req.userId,
      expiresAt: { $gt: Date.now() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  AppAssert(
    foundSessions.length,
    BAD_REQUEST,
    "Could not find any active sessions."
  );

  return res.status(OK).json(
    foundSessions.map((session) => ({
      ...session.toObject(),
      ...(session._id.toString() === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

export const deleteSessionHandler = catchErrors(
  async (req, res): Promise<any> => {
    const requestSessionId = req.sessionId;
    const paramsSessionId = z.string().parse(req.params.id);

    AppAssert(
      requestSessionId.toString() !== paramsSessionId,
      UNAUTHORIZED,
      HTTP_MESSAGES[UNAUTHORIZED]
    );

    const deleted = await Session.findByIdAndDelete(paramsSessionId);
    AppAssert(deleted, NOT_FOUND, "Session not found");
    return res.status(OK).json(deleted);
  }
);
