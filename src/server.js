import "dotenv/config";

import app from "./app.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/database.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("PORT must be a whole number between 1 and 65535.");
}

let server;

async function startServer() {
  try {
    await connectToDatabase();

    server = app.listen(port, () => {
      console.log(`CapstoneDemo API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start CapstoneDemo:", error.message);
    process.exitCode = 1;
  }
}

async function shutDown(signal) {
  console.log(`\n${signal} received. Shutting down...`);

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  await disconnectFromDatabase();
  process.exit(0);
}

process.on("SIGINT", () => void shutDown("SIGINT"));
process.on("SIGTERM", () => void shutDown("SIGTERM"));

await startServer();
