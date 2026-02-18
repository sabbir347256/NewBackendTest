import type { Request, Response, NextFunction } from "express";
import v2 from './../config/cloudinary.ts';
import path from "node:path";
import { fileURLToPath } from "node:url";
import bookModel from "./bookModel.ts";
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const {title,genre} = req.body;
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files.coverImage || files.coverImage.length === 0) {
      return res.status(400).json({ message: "Cover image is required" });
    };

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

    if (!files.file || files.file.length === 0) {
      return res.status(400).json({ message: "File is required" });
    };


    const bookFileName = files.file[0]?.filename;

    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName as string
    );


    const bookFileUpload = await v2.uploader.upload(bookFilePath, {
      resource_type : 'raw',
      filename_override : bookFileName,
      folder : 'book_pdfs',
      format : 'pdf'
    });


    const newBook = await bookModel.create({
      title, 
      genre,
      author:'65f1c7b0d93f1c4e8a123456',
      coverImage : uploadResult.secure_url,
      file : bookFileUpload.secure_url
    });


    await fs.promises.unlink(filePath)
    await fs.promises.unlink(bookFilePath)


    res.status(201).json({
      id : newBook._id
    });
  } catch (err) {
    next(err);
  }
};

export default createBook;