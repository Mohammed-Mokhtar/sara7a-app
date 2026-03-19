import multer from "multer";
import fs from "node:fs";
import { env } from "../../../config/env.js";

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(env.uploadsDir, { recursive: true });
      cb(null, env.uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage });
};

