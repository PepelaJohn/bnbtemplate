import express from "express";
import {
  getApartmentsByLocation,
  getApartmentsByPriceRange,
  addApartment,
  removeApartment,
  addApartmentImages,
  
} from "../controllers/apartments.controller";

const router = express.Router();


router.get("/apartments/location", getApartmentsByLocation);


router.get("/apartments/price", getApartmentsByPriceRange);


router.post("/apartments", addApartment);


router.delete("/apartments/:id", removeApartment);

router.put("/apartments/:id/images", addApartmentImages);





export default router;
