import type { Request, Response, NextFunction } from "express";
import v2 from './../config/cloudinary.ts';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files.coverImage || files.coverImage.length === 0) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const file = files.coverImage[0];

    const coverImageMimeType = file.mimetype?.split("/").at(-1) || "jpg";

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      file.filename
    );

    const uploadResult = await v2.uploader.upload(filePath, {
      filename_override: file.filename,
      folder: "book_covers",
      format: coverImageMimeType,
    });

    console.log("UploadResult:", uploadResult);

    res.status(200).json({
      message: "Book uploaded successfully",
      imageUrl: uploadResult.secure_url,
    });
  } catch (err) {
    next(err);
  }
};

export default createBook;