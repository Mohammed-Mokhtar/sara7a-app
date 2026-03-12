import multer from "multer";
import fs from "node:fs";

export const uploadFile = () => {
  const uploadDir = process.env.VERCEL ? "/tmp/uploads" : "uploads";
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage });
};
