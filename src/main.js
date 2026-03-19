import { createApp, bootstrap } from "./app.controller.js";
import { env } from "../config/env.js";
import { databaseConnection } from "./database/connection.js";
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const app = createApp();

if (env.isVercel) {
  await databaseConnection();
} else {
  bootstrap(app);
}

export default app;

