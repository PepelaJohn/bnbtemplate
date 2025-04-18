import { Request, Response, NextFunction } from "express";

export type CustomController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchErrors =
  (controller: CustomController): CustomController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      console.log(error.stack);
      next(error);
    }
  };
