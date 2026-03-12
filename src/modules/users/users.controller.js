import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import { updateUserSchema } from "./users.validation.js";
import { validate } from "../../common/utils/validation.js";
import {
  deleteProfileService,
  getProfileByUrlService,
  getProfileService,
  getProfileUrlService,
  updateProfileService,
} from "./users.service.js";

const router = Router();

router.get("/profile", auth, getProfileService);

router.delete("/profile", auth, deleteProfileService);

router.patch("/profile", auth, validate(updateUserSchema), updateProfileService);

router.get("/get-url", auth, getProfileUrlService);

router.post("/get-profile-by-url", getProfileByUrlService);

export default router;
