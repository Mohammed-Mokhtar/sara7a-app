import { Router } from "express";
import { auth } from "../../common/middleware/auth.js";
import {
  deleteMessageService,
  getMyMessagesService,
  getSingleMessageService,
  sendMessageService,
} from "./messages.service.js";
import { uploadFile } from "../../common/middleware/multer.js";

const router = Router();

router.post("/", uploadFile().array("images"), sendMessageService);

router.get("/", auth, getMyMessagesService);

router.get("/:messageId", auth, getSingleMessageService);

router.delete("/:messageId", auth, deleteMessageService);

export default router;
