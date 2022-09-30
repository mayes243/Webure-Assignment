import express from "express";
import fileUpload from "express-fileupload";

const router = express.Router();

import { signin, signup } from "../controllers/user.js";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "../middleware/FileHandler.js";
import { IMAGE_EXTENSIONS } from "../utils/index.js";

router.post("/signin", signin);

router.post(
  "/signup",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter(IMAGE_EXTENSIONS),
  fileSizeLimiter,
  signup
);

export default router;
