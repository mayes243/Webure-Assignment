import path from "path";
import mongoose from "mongoose";

// path
export const __dirname = path.resolve();

// image extensions allowed
export const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".jfif",
  ".gif",
  ".JPG",
  ".PNG",
  ".JPEG",
  ".JFIF",
  ".GIF",
];

// validation mongoose id
export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
