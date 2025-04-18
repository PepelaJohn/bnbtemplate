import { Response } from "express";

export const uploadImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const image = req.file as Express.Multer.File;

    if (!image) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({ url: image.path });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err });
  }
};


export const uploadImages = async (req: any, res:any) => {
    try {
        console.log(req.body)
      const files = req.files as Express.Multer.File[];
        console.log(files)
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
  
      const urls = files.map((file) => file.path); // Cloudinary provides file.path as the image URL
      console.log(urls)
      res.status(200).json({ urls });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed", error: err });
    }
  };
  