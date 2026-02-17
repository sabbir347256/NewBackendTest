import { Types } from "mongoose";

export interface Book {
  title: string;
  author: Types.ObjectId;
  genre: string;
  coverImage: string;
  file: string;
}