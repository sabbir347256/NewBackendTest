import type { Request, Response, NextFunction } from "express";

const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("body:", req.body);
    console.log("files:", req.files);

    res.json({ message: "Book route working" });
  } catch (err) {
    next(err); 
  }
};

export default createBook;