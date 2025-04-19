import Log from "../models/log.model";
import  Apartment  from "../models/Appartment";
import Booking from "../models/Booking";
import Room from "../models/Room";
import User from "../models/User";
import { catchErrors } from "../utils/catchErrors"
import mongoose from "mongoose";

export const getLogs = catchErrors(async(req, res): Promise<any> => {
    const logs = await Log.find()
        .populate("performedBy", "name email role _id")
      

    return res.status(200).json(logs)
})




const entityModels: Record<string, mongoose.Model<any>> = {
  Apartment,
  Booking,
  Room,
  User,
};

export const getPopulatedLogs = catchErrors(async (req, res): Promise<any> => {
  const logs = await Log.find()
    .populate("performedBy", "name email role _id")
    .lean(); // make it easier to mutate

  const populatedLogs = await Promise.all(
    logs.map(async (log) => {
      const Model = entityModels[log.entity];
      if (!Model) return log;

      const entityDoc = await Model.findById(log.entityId).lean();
      return {
        ...log,
        entityDetails: entityDoc,
      };
    })
  );

  return res.status(200).json(populatedLogs);
});

