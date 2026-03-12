import { createApp, bootstrap } from "./app.controller.js";
import { databaseConnection } from "./database/connection.js";

const app = createApp();

if (process.env.VERCEL) {
  await databaseConnection();
} else {
  bootstrap(app);
}

export default app;
