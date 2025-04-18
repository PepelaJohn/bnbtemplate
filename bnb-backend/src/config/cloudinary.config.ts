import { v2 as cloudinary, UploadApiOptions  } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../constants/env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;





const storage = new CloudinaryStorage({
  cloudinary,
  params: () => ({
    folder: "orina_apartments",
    allowed_formats: ["jpg", "png", "jpeg"],
  }),
});
export const upload = multer({ storage });
export const uploadMultiple = upload.array("images", 10);

