import { Router } from "express";
import { deleteSessionHandler, getSessionHandler } from "../controllers/session.controller";

const sessionROutes = Router()

sessionROutes.get('/', getSessionHandler)
sessionROutes.delete('/:id', deleteSessionHandler)


export default sessionROutes