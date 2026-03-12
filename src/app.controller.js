import express from "express";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/users/users.controller.js";
import messageRouter from "./modules/messages/messages.controller.js";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  const uploadsDir = process.env.VERCEL ? "/tmp/uploads" : "uploads";
  app.use("/uploads", express.static(uploadsDir));

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/messages", messageRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "route not found" });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
      error: err?.message || "unknown error",
    });
  });

  return app;
};

export const bootstrap = async (app = createApp()) => {
  await databaseConnection();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};
