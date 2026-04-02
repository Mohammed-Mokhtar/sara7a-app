import { createClient } from "redis";

export const client = createClient({
  url: "rediss://default:gQAAAAAAAScGAAIncDI2MjJlODlhMzM2YmQ0ODJlOWU0NjQyMmYxNTQ0MWU4MXAyNzU1MjY@winning-oarfish-75526.upstash.io:6379",
});

client.on("error", function (err) {
  throw err;
});
await client.connect();
