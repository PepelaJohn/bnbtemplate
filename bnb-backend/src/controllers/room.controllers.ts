import { BAD_REQUEST } from "../constants/http";
import Room from "../models/Room";
import { AppAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";

export const updateRoomPricing = catchErrors(
    async (req, res): Promise<any> => {
      const { id } = req.params;
      const { overridePrice } = req.body;
      AppAssert(!!overridePrice, BAD_REQUEST, "Price is required");
  
      const updated = await Room.findByIdAndUpdate(
        id,
        { overridePrice },
        {
          new: true,
        }
      );
  
      return res.status(200).json(updated);
    }
  );