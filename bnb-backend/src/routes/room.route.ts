
import express from "express";
import { updateRoomPricing } from "../controllers/room.controllers";
const router = express.Router();
router.put("/apartments/:id/price", updateRoomPricing);
export default router;