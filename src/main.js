import { createApp, bootstrap } from "./app.controller.js";
import { env } from "../config/env.js";
import { databaseConnection } from "./database/connection.js";

const app = createApp();

if (env.isVercel) {
  await databaseConnection();
} else {
  bootstrap(app);
}

export default app;

