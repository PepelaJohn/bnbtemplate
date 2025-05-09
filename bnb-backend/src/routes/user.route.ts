import { Router } from "express";
import { getUserHandler } from "../controllers/user.controller";


const userRoutes = Router();

// prefix: /user
userRoutes.get("/me", getUserHandler);

export default userRoutes;
