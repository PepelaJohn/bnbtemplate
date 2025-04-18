
import mongoose from "mongoose";
import { catchErrors } from "../utils/catchErrors";
import User from "../models/User";
import { OK } from "../constants/http";
import Room from "../models/Room";

export const getUsers = catchErrors(async(req, res, next):Promise<any>=>{
    const userId = req.userId
    const users = User.find().limit(20).skip(0)
    return res.status(OK).json({users, userId })

})

export const getAllRooms = catchErrors(async(req, res, ):Promise<any>=>{
    const rooms = Room.find()
    return res.status(OK).json(rooms)
})