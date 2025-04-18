// routes/upload.ts
import express from "express";
import { uploadImage, uploadImages } from "../controllers/upload.contrller";
import { upload, uploadMultiple } from "../config/cloudinary.config";


const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.post("/upload-multiple", (req, res, next) => {
    console.log("Before multer - Content-Type:", req.headers['content-type']);
    console.log("Before multer - Body:", req.body);
    next();
  }, uploadMultiple, (req, res, next) => {
    console.log("After multer - Files:", req.files);
    console.log("After multer - Body:", req.body);
    next();
  }, uploadImages);

export default router;
