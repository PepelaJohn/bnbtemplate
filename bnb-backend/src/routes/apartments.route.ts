import express from "express";
import {
  getApartmentsByLocation,
  getApartmentsByPriceRange,
  addApartment,
  removeApartment,
  addApartmentImages,
  getApartments,
  getApartment,
  updateApartment
  
} from "../controllers/apartments.controller";
import { upload } from "../config/cloudinary.config";
import authenticate, { authorize } from "../middleware/authenticate";

const router = express.Router();

router.get('/', getApartments)
router.get('/:id', getApartment)

router.get("/location", getApartmentsByLocation);


router.get("/price", getApartmentsByPriceRange);


router.post("/",authenticate, authorize(['admin', "super_admin"]), addApartment);
router.patch("/:id",authenticate, authorize(['admin', "super_admin"]), updateApartment);


router.delete("/:id",authenticate, authorize([ "super_admin"]), removeApartment);

router.put("/:id/images",upload.array('images', 10), addApartmentImages);





export default router;
