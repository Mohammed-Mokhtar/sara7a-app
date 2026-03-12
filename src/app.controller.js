import express from "express";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/users/users.controller.js";
import messageRouter from "./modules/messages/messages.controller.js";
import { setServers } from "node:dns/promises";

export const bootstrap = () => {
  setServers(["1.1.1.1", "8.8.8.8"]);

  const app = express();
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  databaseConnection();

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/messages", messageRouter);

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};
