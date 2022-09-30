import express from "express";
import fileUpload from "express-fileupload";
import { addBlog, blogs } from "../controllers/blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "../middleware/FileHandler.js";
import { IMAGE_EXTENSIONS } from "../utils/index.js";

router.post(
  "/add",
  auth,
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(IMAGE_EXTENSIONS),
  fileSizeLimiter,
  addBlog
);

router.get("/show", blogs);

export default router;
