import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
// import {ValidationError} from 'mongoose'
import { BAD_GATEWAY, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import { MongooseError } from "mongoose";
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
 

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error.message);
  }

  if (error instanceof z.ZodError) {
    return res.status(BAD_REQUEST).json(error.issues);
  }

  if(error instanceof MongooseError){
    return res.status(BAD_GATEWAY).json(error.message)
  }

  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error!!" });
};
