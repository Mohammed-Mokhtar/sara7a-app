import { Router } from "express";
import {
  generateAccessToken,
  loginService,
  signupService,
} from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validate } from "../../common/utils/validation.js";
import { loginSchema, signupSchema } from "./auth.validate.js";
import { uploadFile } from "../../common/middleware/multer.js";
const router = Router();

router.post(
  "/signup",
  uploadFile().single("images"),
  validate(signupSchema),
  signupService,
);

router.post("/login", validate(loginSchema), loginService);

router.post("/access-token", auth, generateAccessToken);

export default router;
